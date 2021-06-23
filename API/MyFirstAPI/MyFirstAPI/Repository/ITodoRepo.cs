using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyFirstAPI.Models;
namespace MyFirstAPI.Repository
{
    public interface ITodoRepo
    {
        Task<IEnumerable<Todo>> GetTodos();

        Task<Todo> GetTodoByID(int id);

        Task<bool> DeleteTodoByID(int id);

        Task<bool> AddTodo(Todo todo);

        Task<bool> UpdateTodo(Todo todo);
    }
}
