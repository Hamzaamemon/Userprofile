using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewApplication.Models.ViewModel
{
    public class SignupViewModel
    {
        public int UserId { get; set; }

        public string FirstName { get; set; }
            public string LastName { get; set; }
            public string FilePath { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
            public string Password { get; set; }
            public IFormFile img { get; set; }
            public List<IFormFile> MultpleFiles { get; set; }
    }
}
