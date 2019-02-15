using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Role { get; set; } 
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }


        public User()
        {
            
        }
    }
}
