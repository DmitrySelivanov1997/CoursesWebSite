using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class UserDto
    {
        public UserDto()
        {
            
        }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Role { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int Id { get; set; }
    }
}
