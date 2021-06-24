using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyFirstAPI.Models;

namespace MyFirstAPI.Repository
{
    public interface IAuthRepo
    {
        Task<bool> Login(LoginUser user);
        Task<string> GenerateToken(LoginUser user);
    }
}
