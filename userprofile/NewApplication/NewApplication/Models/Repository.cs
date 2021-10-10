using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static NewApplication.Controllers.SignupController;
using NewApplication.Models.ViewModel;
namespace NewApplication.Models
{

    public interface IDataRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(int id);
        public Object Add(SignupViewModel model);
        object Update(TEntity dbEntity, SignupViewModel entity);
        void Delete(TEntity entity);
        public object Authenticate(Login login);
        //public object getemail(string Email);

    }
}
