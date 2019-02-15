using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace commentsiteapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthData _authData;

        public AuthController(
            IOptions<AuthData> authOptions)
        {
            _authData = authOptions.Value;
        }
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            if (user.Login == "1" && user.Password == "1")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authData.Key));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var now = DateTime.UtcNow;
                var expires = now.Add(TimeSpan.FromMinutes(_authData.Lifetime));

                var tokeOptions = new JwtSecurityToken(
                    issuer: _authData.Issuer,
                    audience: _authData.Audience,
                    claims: new List<Claim>(),
                    expires: expires,
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new {Token = tokenString});
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}