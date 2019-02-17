using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class TokenizedUser
    {
        public string Token { get; set; }
        public UserDto User { get; set; }

        public TokenizedUser(string token, UserDto user)
        {
            Token = token;
            User = user;
        }
    }
}
