using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using commentsiteapp.Infrostructure;
using commentsiteapp.Models;
using Microsoft.AspNetCore.Mvc;

namespace commentsiteapp.Controllers
{
    public abstract class ApiController: ControllerBase
    {
        protected ApiController(SiteDbContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }

        protected SiteDbContext Context { get; }
        protected IMapper Mapper { get; }

        protected async Task<ApiResponseGeneric<T>> ExecuteSafely<T>(Func<Task<T>> action)
        {
            try
            {
                var data = await action();
                return new ApiResponseGeneric<T>(data);
            }
            catch (Exception e)
            {
                var response = new ApiResponseGeneric<T>(default(T))
                {
                    Status = "error",
                    Reason = e.Message,
                    Details = e.ToString()
                };
                return response;
            }
        }
    }
}
