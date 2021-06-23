using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Models;
using MyFirstAPI.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFirstAPI.Controllers
{
    [ApiController]
    [Route("api/v1/todos")]
    public class TodoController : Controller
    {
        private readonly ITodoRepo _todoRepo;

        public TodoController(ITodoRepo todoRepo)
        {
            _todoRepo = todoRepo;
        }

        //GET api/v1/todos
        [HttpGet]
        public async Task<IEnumerable<Todo>> GetTodos()
        {
            var todos = await _todoRepo.GetTodos();

            return todos;
        }

        //GET api/v1/todos/5
        [HttpGet("{id}")]
        public async Task<Todo> GetTodoByID(int id)
        {
            Todo todo = await _todoRepo.GetTodoByID(id);

            return todo;
        }

        //POST api/v1/todos
        [HttpPost]
        public async Task<ActionResult> AddTodo([FromForm] Todo todo)
        {
            bool result = await _todoRepo.AddTodo(todo);

            return Ok(new { isSuccess = result });
        }

        //Delete api/v1/todos
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoByID(int id)
        {
            bool result = await _todoRepo.DeleteTodoByID(id);

            return Ok(new { isSuccess = result });
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTodo([FromForm]Todo todo)
        {
            bool result = await _todoRepo.UpdateTodo(todo);

            return Ok(new { isSuccess = result });
        }

    }
}
