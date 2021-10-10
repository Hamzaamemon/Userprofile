using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NewApplication.Models
{
    public class MultipleFilesUpload
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Files_Id { get; set; }
        public string Files_Path { get; set; }
        public int signupsUserId { get; set; }

        //public Signup signups { get; set; }
    }
}
