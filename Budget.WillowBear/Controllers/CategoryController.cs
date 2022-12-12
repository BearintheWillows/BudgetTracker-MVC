using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
using Budget.WillowBear.Models.DTOs;
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
        public async Task<IEnumerable<CategoryDTO>> GetAll()
        {
            // Attempt to find all categories and convert to DTO
            List<CategoryDTO> categories = await _context.Categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
            }).ToListAsync();

            return categories;
        }

        // GET: api/Category/{id}
        //
        [Route("{id}")]
        public async Task<ActionResult<CategoryDTO?>> GetCategoryById(int id)
        {
            // Attempt to find category by id and convert to DTO
            CategoryDTO? category = await _context.Categories.Where(c => c.Id == id).Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
            }).FirstOrDefaultAsync();

            // Check if category is null
            if (category == null)
            {
                return NotFound("Category not found in Database");
            }

            return category;
        }


        // POST: /create
        //
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddCategory(CategoryDTO category)
        {
            var newCategory = new Category
            {
                Name = category.Name,
                Description = category.Description,
            };


            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: /update/{id}
        //
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {

            // Check if category is null
            if (category == null)
            {
                return BadRequest("Category Corrupted");
            }

            // Check if category exists
            if (!_context.Categories.Any(c => c.Id == id))
            {
                return NotFound("Category not found in Database");
            }

            // Retrieve category from database
            var categoryToUpdate = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            categoryToUpdate.Name = category.Name;
            categoryToUpdate.Description = category.Description;
            categoryToUpdate.UpdatedDate = DateTime.Now;

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
            if (category == null)
            {
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