using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using commentsiteapp.Infrostructure;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost, Authorize(Roles = "administrator")]
        public Task<ApiResponseGeneric<int>> PostCourse([FromBody] Course course)
        {
            return ExecuteSafely(async () =>
            {
                Context.Courses.Add(course);
                await Context.SaveChangesAsync();
                return course.Id;
            });
        }
        [HttpPut, Authorize(Roles = "administrator")]
        public Task<ApiResponseGeneric<int>> UpdateCourse([FromBody] Course course)
        {
            return ExecuteSafely(async () =>
            {
                var courseToUpdate = await Context.Courses.SingleOrDefaultAsync(c => c.Id == course.Id);
                if (courseToUpdate != null)
                {
                    Context.Entry(courseToUpdate).CurrentValues.SetValues(course);
                    Context.SaveChanges();
                    return courseToUpdate.Id;
                }
                return -1;
            });
        }
        [HttpGet("get-by-name")]
        public Task<ApiResponseGeneric<IEnumerable<Course>>> GetByNameAsync([FromQuery] string name)
        {
            return ExecuteSafely(async () =>
            {
                var courses = await Context.Courses.Where(c => c.Name.ToLower().Contains(name.ToLower())).ToArrayAsync();
                return (IEnumerable<Course>)courses;
            });
        }
        [HttpDelete("{id}"), Authorize(Roles = "administrator")]
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

        [HttpDelete(), Authorize(Roles = "administrator")]
        public Task<ApiResponseGeneric<int>> DeleteCourses([FromBody] List<int> ids)
        {
            return ExecuteSafely(async () =>
            {
                var entities = await Context.Courses.Where(x => ids.Contains(x.Id)).ToArrayAsync();

                Context.Courses.RemoveRange(entities);

                var count = Context.SaveChanges();
                return count;
            });

        }

        [HttpGet("count")]
        public Task<ApiResponseGeneric<int>> GetCount()
        {
            return ExecuteSafely(async () =>
            {
                var count = await Context.Courses.CountAsync();
                return count;
            });
        }
    }
}