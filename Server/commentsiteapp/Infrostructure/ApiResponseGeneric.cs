using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace commentsiteapp.Infrostructure
{
    public class ApiResponseGeneric<T> : ApiResponse
    {
        public ApiResponseGeneric(T data)
        {
            Data = data;
            Status = "success";
        }

        [JsonProperty("data", DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate)]
        public T Data { get; set; }


    }
}
