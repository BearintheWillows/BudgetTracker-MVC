using Budget.WillowBear.Models;
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

        public DbSet<Transaction>? Transactions { get; set; }
        public DbSet<Category>? Categories { get; set; }
    }
}