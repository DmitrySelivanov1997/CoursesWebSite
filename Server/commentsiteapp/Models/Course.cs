using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Professor { get; set; }
        [Required]
        public string Name { get; set; }
        public string Details { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public Course()
        {
            
        }
    }
}
