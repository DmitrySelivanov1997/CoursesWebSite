using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class CommentsController : ApiController
    {
        private IHttpContextAccessor ContextAccessor { get; set; }
        public CommentsController(SiteDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor) : base(context, mapper)
        {
            ContextAccessor = httpContextAccessor;
        }
        [HttpGet("courses/{id}/get-by-page")]
        public Task<ApiResponseGeneric<IEnumerable<CommentDto>>> GetPaged([FromRoute] int id, int page, int perPage)
        {
            return ExecuteSafely(async () =>
            {
                page = page >= 1 ? page : 0;
                perPage = perPage > 0 ? perPage : 0;

                var comments = await Context.Comments.Include(c=>c.User).Where(c=>c.CourseId == id).Skip(page * perPage).Take(perPage).OrderBy(c=>c.CreationDate).Select(c=>Mapper.Map<CommentDto>(c)).ToArrayAsync();
                foreach (var commentDto in comments)
                {
                    if (commentDto.Anonymous)
                    {
                        commentDto.User = null;
                    }
                }
                return (IEnumerable<CommentDto>)comments;
            });
        }
        [HttpPost, Authorize]
        public Task<ApiResponseGeneric<int>> PostComment([FromBody] Comment comment)
        {
            return ExecuteSafely(async () =>
            {
                comment.CreationDate = DateTime.Now;
                Context.Comments.Add(comment);
                await Context.SaveChangesAsync();
                return comment.Id;
            });
        }
        [HttpDelete("{id}"), Authorize]
        public Task<ApiResponseGeneric<Comment>> DeleteComment([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var comment = await Context.Comments.FindAsync(id);
                if (!(ContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Role)?.Value == "administrator"
                        || ContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ==
                        comment.UserId.ToString()))
                    throw new Exception("Not enought right to delete comment");
                Context.Comments.Remove(comment);
                await Context.SaveChangesAsync();

                return comment;
            });

        }
        [HttpGet("courses/{id}/count")]
        public Task<ApiResponseGeneric<int>> GetCount([FromRoute] int id)
        {
            return ExecuteSafely(async () =>
            {
                var count = await Context.Comments.Where(c=>c.CourseId == id).CountAsync();
                return count;
            });
        }
    }
}