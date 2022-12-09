
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
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
        public async Task<IEnumerable<TransactionDTO>> GetAll()
        {
            List<TransactionDTO> transactions = await _context.Transactions.Include(t => t.Category).Select(t => new TransactionDTO
            {
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                Notes = t.Notes,
                Category = new CategoryDTO
                {
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
        [Route("{id}")]
        public async Task<Transaction?> GetTransactionByIdAsync(int id)
        {
            // Attempt to find transaction by id
            Transaction? transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id);

            // Check if transaction is null
            if (transaction == null)
            {
                Console.WriteLine("Transaction not found");
                return null;
            }

            Console.WriteLine($"transaction {transaction!.Id} Retrieved ");
            return transaction;
        }

        // POST: /create
        //
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> AddTransaction(Transaction transaction)
        {
            try
            {

                // Check if category exists
                if (_context.Categories.Any(c => c.Id == transaction.CategoryId))
                {
                    transaction.Category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == transaction.CategoryId);
                }
                else
                {
                    return BadRequest("Category not found");
                }
                Console.WriteLine($"{transaction}");

                await _context.Transactions.AddAsync(transaction);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Transaction not added");
            }
        }

        // PUT: /edit
        //
        [HttpPut("edit/{id}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Transaction transaction)
        {

            // Check if transaction exists
            if (!_context.Transactions.Any(t => t.Id == id))
            {
                return NotFound("Transaction not found");
            }

            _context.Transactions.Update(transaction);

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
            //
            if (transaction == null)
            {
                return NotFound("Transaction not found");
            }

            try
            {
                Console.WriteLine("Deleting transaction");
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