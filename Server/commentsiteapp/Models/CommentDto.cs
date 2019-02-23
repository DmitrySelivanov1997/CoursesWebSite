using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public bool Anonymous { get; set; }
        public DateTime CreationDate { get; set; }

        public CommentDto()
        {

        }
    }
}
