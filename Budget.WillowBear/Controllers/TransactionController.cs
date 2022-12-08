
using Budget.WillowBear.Data;
using Budget.WillowBear.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public IEnumerable<Transaction> GetAll()
        {
            return _context.Transactions;
        }



    }
}