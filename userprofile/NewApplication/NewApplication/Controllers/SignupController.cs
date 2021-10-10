using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NewApplication.Authentication;
using NewApplication.Models;
using System.IO;
using Newtonsoft.Json;
using NewApplication.Models.ViewModel;

namespace NewApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly IDataRepository<Signup> _signupRepository;
        public static IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;
        public SignupController(IDataRepository<Signup> signupRepository, IConfiguration configuration, IHostingEnvironment environment)
        {

            _signupRepository = signupRepository;
            _configuration = configuration;
            _environment = environment;
        }
        [HttpGet]
        [Authorize]

        public IActionResult Get()
        {
            IEnumerable<Signup> signups = _signupRepository.GetAll();
            return Ok(signups);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            Signup signups = _signupRepository.Get(id);
            if (signups == null)
            {
                return NotFound("The user record couldn't be found.");
            }
            return Ok(signups);
        }

   

        //[HttpPost("/api/register")]
        public Object Post([FromForm] SignupViewModel files)
        {
            // Save User
            var response = _signupRepository.Add(files);
            return (response);
        }

        [HttpPut("/api/UserProfile/{id}")]
        [Authorize]

        public object Put(int id, [FromForm] SignupViewModel files)

        {
            if (files == null)
            {
                return BadRequest("Employee is null.");
            }
            Signup signupToUpdate = _signupRepository.Get(id);
            if (signupToUpdate == null)
            {
                return NotFound("The User record couldn't be found.");
            }
            var response = _signupRepository.Update(signupToUpdate, files);
            return (response);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Signup signups = _signupRepository.Get(id);
            if (signups == null)
            {
                return NotFound("The User record couldn't be found.");
            }
            _signupRepository.Delete(signups);
            return NoContent();
        }

        //[HttpPost("/api/Login")]
        [HttpPost("/api/Login")]
        public async Task<object> Login([FromBody] Login logins)
        {
          
            var response = _signupRepository.Authenticate(logins);
            return (response);

            
        }
    }
}
