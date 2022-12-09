using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IEnumerable<Category>> GetAll()
        {
            var categories = new List<Category>();
            categories = await _context.Categories.ToListAsync();

            if (!categories.Any())
            {
                return categories;
            }

            return categories;
        }

        // GET: api/Category/{id}
        //
        [HttpGet("{id}")]
        public async Task<Category?> GetCategoryById(int id)
        {
            // Attempt to find category by id
            //
            Category? category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            // Check if category is null
            //
            if (category == null)
            {
                Console.WriteLine("Category not found");
                return null;
            }

            Console.WriteLine($"category {category!.Id} Retrieved ");
            return category;
        }


        // POST: /create
        //
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: /update/{id}
        //
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {

            // Check if category is null
            //
            if (category == null)
            {
                Console.WriteLine("Category not found");
                return BadRequest("Category Corrupted");
            }

            // Check if category exists
            //
            if (!_context.Categories.Any(c => c.Id == id))
            {
                Console.WriteLine("Category not found");
                return NotFound("Category not found in Database");
            }

            var categoryToUpdate = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            categoryToUpdate.Name = category.Name;
            categoryToUpdate.Description = category.Description;
            categoryToUpdate.UpdatedDate = category.UpdatedDate;

            try
            {

                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Error updating category");
            }
        }


        // DELETE: /delete/{id}
        //
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteCategoriesAndTransactions(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            // Check if category exists
            //
            if (category == null)
            {
                Console.WriteLine("Category not found");
                return NotFound("Category not found in Database");
            }

            try
            {
                // Delete category
                _context.Categories.Remove(category);

                // Check if category has any transactions
                if (_context.Transactions.Any(t => t.Category.Id == category.Id))
                {
                    // Delete all transactions associated with category
                    Console.WriteLine("Deleting transactions");
                    _context.Transactions.RemoveRange(_context.Transactions.Where(t => t.Category.Id == category.Id));
                }
                await _context.SaveChangesAsync();
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