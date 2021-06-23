using MyFirstAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFirstAPI.Repository
{
    public class TodoRepo : ITodoRepo
    {
        private readonly TodoListContext _context;
        public TodoRepo(TodoListContext context)
        {
            _context = context;
        }

        public async Task<bool> AddTodo(Todo todo)
        {
            try
            {
                _context.Todos.Add(todo);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteTodoByID(int id)
        {
            Todo todo = _context.Todos.Where(a => a.Id == id).FirstOrDefault();

            if(todo != null)
            {
                _context.Todos.Remove(todo);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<Todo> GetTodoByID(int id)
        {
            Todo todos = _context.Todos.Where(a => a.Id == id).FirstOrDefault();

            return todos;
        }

        public async Task<IEnumerable<Todo>> GetTodos()
        {
            var todos = _context.Todos.ToList();

            return todos;
        }

        public async Task<bool> UpdateTodo(Todo todo)
        {
            Todo updTodo = _context.Todos.Where(a => a.Id == todo.Id).FirstOrDefault();

            if(updTodo != null)
            {
                updTodo.Name = todo.Name;
                updTodo.Level = todo.Level;
                updTodo.IsDone = todo.IsDone;

                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
