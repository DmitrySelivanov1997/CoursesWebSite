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

namespace commentsiteapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ApiController
    {
        private readonly SiteDbContext _context;
        private IPasswordManager _passwordManager;

        public UsersController(SiteDbContext context, IPasswordManager passwordManager, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _passwordManager = passwordManager;
        }

        // GET: api/Users
        [HttpGet]
        public Task<ApiResponseGeneric<IEnumerable<UserDto>>> GetUsers()
        {
            return ExecuteSafely(async()=>
            {
                var users = await _context.Users.Select(u => Mapper.Map<UserDto>(u)).ToArrayAsync();
                return (IEnumerable<UserDto>) users;
            });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public Task<ApiResponseGeneric<UserDto>> GetUser([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
                {
                    var user = await _context.Users.FindAsync(id);
                    var userDto = Mapper.Map<UserDto>(user);
                    return userDto;
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
                    _context.SaveChanges();
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
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user.Id;
            });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public Task<ApiResponseGeneric<User>> DeleteUser([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var user = await _context.Users.FindAsync(id);

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return user;
            });
            
        }

        private Task<ApiResponseGeneric<bool>> UserExists(int id)
        {
            return ExecuteSafely(async () =>
            {
                var user = await _context.Users.AnyAsync(e => e.Id == id);
                return user;
            });
        }
        protected async Task<User> ViewModelToEntityAsync(UserDto viewModel, ActionType actionType)
        {
            User user;
            if (actionType == ActionType.Create)
            {
                var userExists = await _context.Users.AnyAsync(u => u.Login == viewModel.Login);
                if (userExists)
                {
                    throw new Exception("This login already exists.");
                }
                user = new User();
                Mapper.Map(viewModel, user);
            }
            else
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Id == viewModel.Id);

                var userLogin = user.Login;
                Mapper.Map(viewModel, user);
                user.Login = userLogin;
            }

            user.PasswordHash = _passwordManager.CreatePassword(viewModel.Login, viewModel.Password);

            return user;
        }
    }
}