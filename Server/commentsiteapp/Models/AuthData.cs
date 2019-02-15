﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace commentsiteapp.Models
{
    public class AuthData
    {
        public string Issuer { get; set; }
        public string Key { get; set; }
        public string Audience { get; set; }
        public int Lifetime { get; set; }
    }
}
