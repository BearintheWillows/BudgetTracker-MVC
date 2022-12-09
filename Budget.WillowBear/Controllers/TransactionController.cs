
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
        public async Task<IEnumerable<Transaction>> GetAllTransactions()
        {
            var transactions = new List<Transaction>();
            transactions = await _context.Transactions.ToListAsync();

            return transactions;
        }

        // GET: api/Transaction/{id}
        //
        [HttpGet("{id}")]
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
        public async Task<IActionResult> AddTransaction(Transaction transaction)
        {
            try
            {
                _context.Transactions.AddAsync(transaction);
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
        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> EditTransaction(Transaction transaction, int id)
        {

            // Check if transaction exists
            if (!_context.Transactions.Any(t => t.Id == id))
            {
                return NotFound("Transaction not found");
            }

            try
            {
                _context.Entry(transaction).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Transaction not updated");
            }
        }

        // DELETE: /delete{id}
        //
        [HttpDelete("{id}")]
        [Route("delete/{id}")]
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