using System;
using System.Collections.Generic;

#nullable disable

namespace MyFirstAPI.Models
{
    public partial class Todo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        public bool? IsDone { get; set; }
    }
}
