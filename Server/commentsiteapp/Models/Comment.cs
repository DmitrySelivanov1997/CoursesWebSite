using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string Value { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public DateTime CreationDate { get; set; }

        public Comment()
        {
            
        }
    }
}
