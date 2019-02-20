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
    public class CommentsController : ApiController
    {
        public CommentsController(SiteDbContext context, IMapper mapper) : base(context, mapper)
        {
        }
        [HttpGet("get-by-page")]
        public Task<ApiResponseGeneric<IEnumerable<Comment>>> GetPaged(int page, int perPage)
        {
            return ExecuteSafely(async () =>
            {
                page = page >= 1 ? page : 0;
                perPage = perPage > 0 ? perPage : 0;

                var courses = await Context.Comments.Skip(page * perPage).Take(perPage).ToArrayAsync();
                return (IEnumerable<Comment>)courses;
            });
        }
        [HttpPost]
        public Task<ApiResponseGeneric<int>> PostComment([FromBody] Comment comment)
        {
            return ExecuteSafely(async () =>
            {
                Context.Comments.Add(comment);
                await Context.SaveChangesAsync();
                return comment.Id;
            });
        }
        [HttpDelete("{id}")]
        public Task<ApiResponseGeneric<Comment>> DeleteComment([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var comment = await Context.Comments.FindAsync(id);

                Context.Comments.Remove(comment);
                await Context.SaveChangesAsync();

                return comment;
            });

        }
    }
}