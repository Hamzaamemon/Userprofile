using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NewApplication.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static NewApplication.Controllers.SignupController;

namespace NewApplication.Models.DataManager
{
    public class SignupManager : IDataRepository<Signup>
    {
        readonly SignupContext _signupContext;
        readonly IConfiguration _configuration;
        public static IHostingEnvironment _environment;

        public SignupManager(SignupContext context, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _signupContext = context;
            _configuration = configuration;
            _environment = hostingEnvironment;
        }

        ///for file Upload
        public string ImageUpload(SignupViewModel model)
        {
            try
            {
                var path = _environment.WebRootPath + "\\Resources\\Images\\";
                // ||
                if (model.img.Length > 0)
                {

                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    using (FileStream fileStream = System.IO.File.Create(path + model.img.FileName))
                    {
                        model.img.CopyTo(fileStream);
                        fileStream.Flush();
                        return model.FilePath = path + model.img.FileName;
                        //return "\\Resources\\Images\\" + files.file.FileName; ;
                    }
                }
                else
                {
                    return "failed";
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        public List<string> FileUpload(SignupViewModel model)
        {
            //try
            //{
                var fullpath = "";
                List<string> listOfFiles = new List<string>();

                //var result = new List<MultipleFilesUpload>();
                //var httpClient = new HttpClient();
                //var multipartFormDataContent = new MultipartFormDataContent();
                var path = _environment.WebRootPath + "\\Resources\\Files\\";
                // ||
                if (model.MultpleFiles != null)
                {
                    foreach (IFormFile file in model.MultpleFiles)
                    {
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        using (FileStream fileStream = System.IO.File.Create(path + file.FileName))
                        {
                            file.CopyTo(fileStream);
                            fileStream.Flush();
                            fullpath = model.FilePath = path + file.FileName;
                            listOfFiles.Add(fullpath);
                            //return model.FilePath = path + file.FileName;
                            //return "\\Resources\\Images\\" + files.file.FileName; ;
                        }
                    }
                   
                    return listOfFiles;
                }
                else
                {
                    return listOfFiles;
                }
           
            //}
            //catch (Exception ex)
            //{
            //    return ex.Message.ToString();
            //}
        }

        ///for add
        public Object Add(SignupViewModel model)
        {
            try
            {
                Signup entity = new Signup();
                entity.FirstName = model.FirstName;
                entity.LastName = model.LastName;
                entity.ImagePath = ImageUpload(model);

                var Email = _signupContext.Signups.FirstOrDefault(x => x.Email.Equals(model.Email));
                if (Email != null)
                {
                    return new
                    {
                        Message = "Email already exists",
                        IsSucesss = false,
                    };
                }
                else
                {
                    entity.Email = model.Email;
                }
                entity.Email = model.Email;
                entity.PhoneNumber = model.PhoneNumber;
                entity.Password = model.Password;
                _signupContext.Signups.Add(entity);
                _signupContext.SaveChanges();
                if (entity != null)
                {
                    return new
                    {

                        Message = "Profile Register Successfully",
                        IsSucesss = true,
                    };
                }
                else
                {
                    return new
                    {
                        Message = "Profile Register failed",
                        IsSucesss = false
                    };
                }

            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        //public object getemail(string Email)
        //{
        //    return _signupContext.Signups.FirstOrDefault(e => e.Email == Email);


        //}
        ///for delete
        public void Delete(Signup signup)
        {
            _signupContext.Signups.Remove(signup);
            _signupContext.SaveChanges();
        }
        ///for get specific
        public Signup Get(int id)
        {
            return _signupContext.Signups.FirstOrDefault(e => e.UserId == id);
        }

        ///for getall
        [Authorize]
        public IEnumerable<Signup> GetAll()
        {
            return _signupContext.Signups.ToList();
        }
        ///for Update
        ///



        //[Authorize]
        public object Update(Signup signup, SignupViewModel entity)
        {
            //,MultipleFilesUpload multipleFilesUpload
            MultipleFilesUpload multipleFilesUpload = new MultipleFilesUpload();
           
            try
            {
                signup.FirstName = entity.FirstName;
                signup.LastName = entity.LastName;
                signup.Email = entity.Email;
                signup.PhoneNumber = entity.PhoneNumber;
                signup.Password = entity.Password;
                if (entity.img == null)
                {
                    signup.ImagePath = signup.ImagePath;
                }
                else
                {
                    signup.ImagePath = ImageUpload(entity);
                }
                signup.Password = entity.Password;

                var data = FileUpload(entity);
                if (data.Count > 0)
                {
                    foreach (var item in data)
                    {
                        var fileupload = _signupContext.multipleFilesUploads.FirstOrDefault(x => x.Files_Path.Equals(item) && x.signupsUserId.Equals(Convert.ToInt32(signup.UserId)));
                        if(fileupload != null)
                        {
                            _signupContext.SaveChanges();

                        }
                        else
                        {
                            multipleFilesUpload.Files_Id = 0;
                            multipleFilesUpload.Files_Path = item;
                            multipleFilesUpload.signupsUserId = Convert.ToInt32(signup.UserId);
                            _signupContext.multipleFilesUploads.Add(multipleFilesUpload);
                            _signupContext.SaveChanges();
                        }

                        //multipleFilesUpload.Files_Id = 0;
                        //multipleFilesUpload.Files_Path = item;
                        //multipleFilesUpload.signupsUserId = Convert.ToInt32(signup.UserId);
                        //_signupContext.multipleFilesUploads.Add(multipleFilesUpload);
                        //_signupContext.SaveChanges();
                    }
                }
                else
                {
                    _signupContext.SaveChanges();
                }

                byte[] b = System.IO.File.ReadAllBytes(signup.ImagePath);
                Convert.ToBase64String(b);
                signup.ImagePath = "data:image/png;base64," + Convert.ToBase64String(b);
                if (entity != null)
                {
                    return new
                    {

                        Message = "Profile Edit Successfully",
                        IsSucesss = true,
                        Data = signup
                    };
                }
                else
                {
                    return new
                    {
                        Message = "Profile Edit failed",
                        IsSucesss = false
                    };
                }
            }
            catch (Exception ex)
                {
                return ex.Message.ToString();
            }
        }

        public object Authenticate(Login login)
        {
            try
            {
                var entity = _signupContext.Signups.Where(x => x.Email.ToLower().Contains(login.Email.ToLower())
                &&
                x.Password.Contains(login.Password)).FirstOrDefault();
                byte[] b = System.IO.File.ReadAllBytes(entity.ImagePath);
                Convert.ToBase64String(b);
                entity.ImagePath = "data:image/png;base64," + Convert.ToBase64String(b);
                if (entity != null)
                {
                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                    var token = new JwtSecurityToken(
                       issuer: _configuration["JWT:ValidIssuer"],
                       audience: _configuration["JWT:ValidAudience"],
                       expires: DateTime.Now.AddHours(3),
                       //claims: authClaims,
                       signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                       );
                    return new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        Message = "Sucessfully Authenticated",
                        IsSucesss = true,
                        Data = entity
                    };
                }
                else
                {
                    return new
                    {
                        Message = "Not a valid account",
                        IsSucesss = false
                    };
                }

            }
            catch (Exception)
            {

                return new
                {
                    Message = "failed",
                    IsSucesss = false
                };
            }


        }
    }
}
