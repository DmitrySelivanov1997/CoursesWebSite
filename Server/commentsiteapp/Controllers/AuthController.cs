using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using commentsiteapp.Infrostructure;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace commentsiteapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ApiController
    {
        private AuthData _authData;
        private IPasswordManager _passwordManager;

        public AuthController(SiteDbContext context, IMapper mapper,
            IOptions<AuthData> authOptions, IPasswordManager manager) : base(context, mapper)
        {
            _authData = authOptions.Value;
            _passwordManager = manager;
        }

        [HttpPost, Route("login")]
        public Task<ApiResponseGeneric<TokenizedUser>> Login([FromBody]LoginModel loginModel)
        {
            return ExecuteSafely(async () =>
            {
                var user = await Context.Users.FirstOrDefaultAsync(u => loginModel.Login == u.Login);
                var passwordsAreEqual = _passwordManager.PasswordsAreEqual(loginModel.Login, loginModel.Password, user.PasswordHash);

                if (!passwordsAreEqual)
                    throw new Exception("Login or password are incorrect");

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authData.Key));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var now = DateTime.UtcNow;
                var expires = now.Add(TimeSpan.FromMinutes(_authData.Lifetime));
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Login),
                    new Claim(ClaimTypes.Role, user.Role)
                };

                var tokeOptions = new JwtSecurityToken(
                    issuer: _authData.Issuer,
                    audience: _authData.Audience,
                    claims: claims,
                    expires: expires,
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new TokenizedUser(tokenString, Mapper.Map<UserDto>(user));
            });
        }
    }
}