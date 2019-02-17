using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace commentsiteapp.Infrostructure
{
    public class ApiResponse
    {
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("reason", DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate)]
        public string Reason { get; set; }
        [JsonProperty("details", DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate)]
        public string Details { get; set; }

        public bool HasError()
        {
            if (Status == "error")
                return true;
            return false;
        }
    }
}
