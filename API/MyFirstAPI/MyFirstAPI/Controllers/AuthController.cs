using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Models;
using MyFirstAPI.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFirstAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;
       
        public AuthController(IAuthRepo authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromForm] LoginUser loginUser)
        {
            bool result = await _authRepo.Login(loginUser);

            if(result)
            {
                var token = await _authRepo.GenerateToken(loginUser);
                return Ok(new { isSuccess = result, token = token });
            }    
            
            return Unauthorized();
        }


    }
}
