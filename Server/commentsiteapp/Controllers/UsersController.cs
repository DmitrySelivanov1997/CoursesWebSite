using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using commentsiteapp.Infrostructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Authorization;

namespace commentsiteapp.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "administrator")]
    [ApiController]
    public class UsersController : ApiController
    {
        private IPasswordManager _passwordManager;

        public UsersController(SiteDbContext context, IPasswordManager passwordManager, IMapper mapper) : base(context, mapper)
        {
            _passwordManager = passwordManager;
        }

        // GET: api/Users
        [HttpGet]
        public Task<ApiResponseGeneric<IEnumerable<UserDto>>> GetUsers()
        {
            return ExecuteSafely(async()=>
            {
                var users = await Context.Users.Select(u => Mapper.Map<UserDto>(u)).ToArrayAsync();
                return (IEnumerable<UserDto>) users;
            });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public Task<ApiResponseGeneric<UserDto>> GetUser([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
                {
                    var user = await Context.Users.FindAsync(id);
                    var userDto = Mapper.Map<UserDto>(user);
                    return userDto;
                });
        }
        [HttpGet("get-by-login")]
        public Task<ApiResponseGeneric<IEnumerable<UserDto>>> GetByLoginAsync([FromQuery] string login)
        {
            return ExecuteSafely(async () =>
            {
                var users = await Context.Users.Where(u => u.Login == login).Select(u => Mapper.Map<UserDto>(u)).ToArrayAsync();
                return (IEnumerable<UserDto>)users;
            });
        }
        [HttpGet("count")]
        public Task<ApiResponseGeneric<int>> GetCount()
        {
            return ExecuteSafely(async () =>
            {
                var count = await Context.Users.CountAsync();
                return count;
            });
        }
        [HttpGet("get-by-page")]
        public Task<ApiResponseGeneric<IEnumerable<UserDto>>> GetPaged(int page, int perPage)
        {
            return ExecuteSafely(async () =>
            {
                page = page >= 1 ? page : 0;
                perPage = perPage > 0 ? perPage : 0;

                var user = await Context.Users.Skip(page * perPage).Take(perPage).Select(u => Mapper.Map<UserDto>(u)).ToArrayAsync();
                return (IEnumerable<UserDto>)user;
            });
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public Task<ApiResponseGeneric<int>> PutUser([FromRoute] int id, [FromBody] UserDto userDto)
        {
            return ExecuteSafely(async () =>
            {
                var oldUser = await ViewModelToEntityAsync(userDto, ActionType.Update);
                if (oldUser != null)
                {
                    Context.SaveChanges();
                    return oldUser.Id;
                }
                return -1;
            });
        }

        // POST: api/Users
        [HttpPost]
        public Task<ApiResponseGeneric<int>> PostUser([FromBody] UserDto userDto)
        {
            return ExecuteSafely(async () =>
            {
                var user = await ViewModelToEntityAsync(userDto, ActionType.Create);
                Context.Users.Add(user);
                await Context.SaveChangesAsync();
                return user.Id;
            });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public Task<ApiResponseGeneric<UserDto>> DeleteUser([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var user = await Context.Users.FindAsync(id);

                Context.Users.Remove(user);
                await Context.SaveChangesAsync();

                return Mapper.Map<UserDto>(user);
            });
            
        }
        [HttpDelete()]
        public Task<ApiResponseGeneric<int>> DeleteUsers([FromBody] List<int> ids)
        {
            return ExecuteSafely(async () =>
            {
                var entities = await Context.Users.Where(x => ids.Contains(x.Id)).ToArrayAsync();

                Context.Users.RemoveRange(entities);

                var count = Context.SaveChanges();
                return count;
            });

        }

        private Task<ApiResponseGeneric<bool>> UserExists(int id)
        {
            return ExecuteSafely(async () =>
            {
                var user = await Context.Users.AnyAsync(e => e.Id == id);
                return user;
            });
        }
        protected async Task<User> ViewModelToEntityAsync(UserDto viewModel, ActionType actionType)
        {
            User user;
            if (actionType == ActionType.Create)
            {
                var userExists = await Context.Users.AnyAsync(u => u.Login == viewModel.Login);
                if (userExists)
                {
                    throw new Exception("This login already exists.");
                }
                user = new User();
                Mapper.Map(viewModel, user);
                user.Role = "user";
            }
            else
            {
                user = await Context.Users.FirstOrDefaultAsync(u => u.Id == viewModel.Id);

                var userLogin = user.Login;
                Mapper.Map(viewModel, user);
                user.Login = userLogin;
            }

            user.PasswordHash = _passwordManager.CreatePassword(viewModel.Login, viewModel.Password);

            return user;
        }
    }
}