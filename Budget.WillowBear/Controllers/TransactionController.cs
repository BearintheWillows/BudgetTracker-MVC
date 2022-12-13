
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
using Budget.WillowBear.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Budget.WillowBear.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly BudgetDbContext _context;

        public TransactionController(BudgetDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        //
        [HttpGet]
        public async Task<IEnumerable<TransactionDTO?>> GetAll()
        {
            List<TransactionDTO> transactions = await _context.Transactions.Include(t => t.Category).Select(t => new TransactionDTO
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                Notes = t.Notes,
                Category = new CategoryDTO
                {
                    Id = t.Category.Id,
                    Name = t.Category.Name,
                    Description = t.Category.Description,
                },
                TransactionType = t.TransactionType
            }).ToListAsync();

            return transactions;
        }

        // GET: api/Transaction/{id}
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO?>> GetTransactionByIdAsync(int id)
        {
            // Attempt to find transaction by id and convert to DTO
            TransactionDTO? transaction = await _context.Transactions.Where(t => t.Id == id).Include(t => t.Category).Select(t => new TransactionDTO
            {
                Id = t.Id,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                Notes = t.Notes,
                Category = new CategoryDTO
                {
                    Id = t.Category.Id,
                    Name = t.Category.Name,
                    Description = t.Category.Description,
                },
                TransactionType = t.TransactionType
            }).FirstOrDefaultAsync();

            // Check if transaction is null
            if (transaction == null)
            {
                return BadRequest("Transaction not found");
            }

            return transaction;
        }

        // POST: /create
        //
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddTransaction(TransactionDTO transaction)
        {

            var newTransaction = new Transaction
            {
                TransactionDate = transaction.TransactionDate,
                Amount = transaction.Amount,
                Notes = transaction.Notes,
                CategoryId = transaction.CategoryId,
                TransactionType = transaction.TransactionType
            };

            // Check if category exists
            // If it does, set the category to the transaction
            // If it doesn't, return not found
            if (_context.Categories.Any(c => c.Id == transaction.CategoryId))
            {
                newTransaction.Category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == transaction.CategoryId);
                newTransaction.CategoryId = transaction.CategoryId;
            }
            else
            {
                return NotFound("Category not found");
            }

            try
            {
                await _context.Transactions.AddAsync(newTransaction);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Transaction not added");
            }
        }

        // PUT: /edit/{id}
        //
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Transaction transaction)
        {

            // Check if category exists
            // If it does, set the category to the transaction
            // If it doesn't, return not found
            if (!_context.Categories.Any(c => c.Id == transaction.CategoryId))
            {
                return NotFound("Category not found");
            }
            else
            {
                transaction.Category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == transaction.CategoryId);

            }

            // Retrieve transaction from database
            var toBeUpdated = _context.Transactions.Where(t => t.Id == id).Include(t => t.Category).FirstOrDefaultAsync();

            // Check if transaction exists
            // If it does, update the transaction
            // If it doesn't, return not found
            if (toBeUpdated == null)
            {
                return NotFound("Transaction not found");
            }
            else
            {
                toBeUpdated.Result.TransactionDate = transaction.TransactionDate;
                toBeUpdated.Result.Amount = transaction.Amount;
                toBeUpdated.Result.Notes = transaction.Notes;
                toBeUpdated.Result.Category = transaction.Category;
                toBeUpdated.Result.TransactionType = transaction.TransactionType;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest("Transaction not updated - " + e.Message);
            }
        }

        // DELETE: /delete{id}
        //
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id);

            // Check if transaction exists
            if (transaction == null)
            {
                return NotFound("Transaction not found");
            }

            try
            {
                _context.Transactions.Remove(transaction);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Transaction not deleted");
            }
        }

    }
}