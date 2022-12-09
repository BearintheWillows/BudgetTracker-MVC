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

        // GET: api/Category
        //
        [HttpGet]
        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }

        // POST: api/Category
        [HttpPost]
        [Route("create")]
        public IActionResult Create(Category category)
        {
            _context.AddCategory(category);
            return Ok();
        }

        // PUT: api/Category/edit/{id}
        [HttpPut]
        [Route("edit/{id}")]
        public IActionResult EditCategory(Category category)
        {
            // Check if category is null
            //
            if (category == null)
            {
                return BadRequest("No category provided");
            }

            // Check if category id matches route id
            //
            if (category.Id != category.Id)
            {
                return BadRequest("Category Id mismatch");
            }

            // Check if category exists
            //
            if (!_context.Categories.Any(c => c.Id == category.Id))
            {
                return NotFound("Category not found");
            }

            try
            {
                _context.Update(category);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Error updating category");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);

            // Check if category exists
            //
            if (category == null)
            {
                return NotFound("Category not found");
            }

            try
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Error deleting category");
            }
        }
    }
}