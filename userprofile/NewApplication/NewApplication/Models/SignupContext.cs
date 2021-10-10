using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NewApplication.Authentication;

namespace NewApplication.Models
{
    //public class SignupContext: IdentityDbContext<ApplicationUser>
    //{
    public class SignupContext : DbContext
    {
        public SignupContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<Signup> Signups { get; set; }
        public DbSet<MultipleFilesUpload> multipleFilesUploads { get; set; }
    }
}
