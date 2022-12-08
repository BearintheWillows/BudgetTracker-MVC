using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget.WillowBear.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {

        private readonly BudgetDbContext _context;

        public CategoryController(BudgetDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }

        [HttpPost]
        public IActionResult Create(Category category)
        {
            _context.AddCategory(category);
            return Ok();
        }
    }
}