using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyFirstAPI.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyFirstAPI.Repository
{
    public class AuthRepo : IAuthRepo
    {
        private readonly TodoListContext _context;
        private readonly IConfiguration _configuration;
        public AuthRepo(TodoListContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> GenerateToken(LoginUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            };

            var token = new JwtSecurityToken(
                            issuer: _configuration["Jwt:Issuer"],
                            audience: _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddMinutes(15),
                            signingCredentials: credentials
                        );

            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodeToken;
        }

        public async Task<bool> Login(LoginUser user)
        {
            var result = _context.Users.Where(a => a.UserName == user.UserName && a.Password == user.Password).FirstOrDefault();

            if(result != null)
            {
                return true;
            }

            return false;
        }
    }
}
