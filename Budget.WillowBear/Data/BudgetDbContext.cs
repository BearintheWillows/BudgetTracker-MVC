using Budget.WillowBear.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Budget.WillowBear.Data
{
    public class BudgetDbContext : DbContext
    {
        public BudgetDbContext(DbContextOptions<BudgetDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TransactionConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        }

        public virtual DbSet<Transaction> Transactions { get; set; }
        public virtual DbSet<Category> Categories { get; set; }


        // CATEGORY METHODS //

        // TRANSACTION METHODS //








        // DELETE
        //
        public bool DeleteTransaction(int id)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);

            // Check if transaction exists
            //
            if (transaction == null)
            {
                Console.WriteLine("Transaction not found");
                return false;
            }

            try
            {
                Console.WriteLine("Deleting transaction");
                Transactions.Remove(transaction);
                Console.WriteLine("Transaction deleted");
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}