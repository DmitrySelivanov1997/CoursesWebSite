using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using commentsiteapp.Infrostructure;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace commentsiteapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ApiController
    {
        public CoursesController(SiteDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
        [HttpGet("get-by-page")]
        public Task<ApiResponseGeneric<IEnumerable<Course>>> GetPaged(int page, int perPage)
        {
            return ExecuteSafely(async () =>
            {
                page = page >= 1 ? page : 0;
                perPage = perPage > 0 ? perPage : 0;

                var courses = await Context.Courses.Skip(page * perPage).Take(perPage).ToArrayAsync();
                return (IEnumerable<Course>)courses;
            });
        }
        [HttpPost]
        public Task<ApiResponseGeneric<int>> PostCourse([FromBody] Course course)
        {
            return ExecuteSafely(async () =>
            {
                Context.Courses.Add(course);
                await Context.SaveChangesAsync();
                return course.Id;
            });
        }
        [HttpDelete("{id}")]
        public Task<ApiResponseGeneric<Course>> DeleteCourse([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var course = await Context.Courses.FindAsync(id);

                Context.Courses.Remove(course);
                await Context.SaveChangesAsync();

                return course;
            });

        }
    }
}