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

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }


        // CATEGORY METHODS //

        // POST
        //
        public void AddCategory(Category category)
        {
            Categories.Add(category);
            SaveChanges();
        }

        // GET ALL
        //
        public IEnumerable<Category> GetAllCategories()
        {
            return Categories;
        }

        // GET BY ID
        //
        public Category? GetCategoryById(int id)
        {
            // Attempt to find category by id
            //
            Category? category = Categories.FirstOrDefault(c => c.Id == id);

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

        // PUT
        //
        public bool UpdateCategory(Category category)
        {
            // Check if category is null
            //
            if (category == null)
            {
                Console.WriteLine("Category not found");
                return false;
            }

            // Check if category exists
            //
            if (!Categories.Any(c => c.Id == category.Id))
            {
                Console.WriteLine("Category not found");
                return false;
            }

            try
            {
                Categories.Update(category);
                SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        // DELETE
        // Deletes category and all transactions associated with category
        //
        public bool DeleteCategoriesAndTransactions(int id)
        {
            var category = Categories.FirstOrDefault(c => c.Id == id);

            // Check if category exists
            //
            if (category == null)
            {
                Console.WriteLine("Category not found");
                return false;
            }

            try
            {
                // Delete category
                Categories.Remove(category);

                // Check if category has any transactions
                if (Transactions.Any(t => t.CategoryId == category.Id))
                {
                    // Delete all transactions associated with category
                    Console.WriteLine("Deleting transactions");
                    Transactions.RemoveRange(Transactions.Where(t => t.CategoryId == category.Id));
                }
                SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        // TRANSACTION METHODS //

        // POST
        //
        public bool AddTransaction(Transaction transaction)
        {
            try
            {
                Transactions.Add(transaction);
                SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Transaction not added");
                Console.WriteLine(e.Message);
                return false;
            }
        }

        // GET ALL
        //
        public IEnumerable<Transaction> GetAllTransactions()
        {
            return Transactions;
        }

        // GET BY ID
        //
        public Transaction? GetTransactionById(int id)
        {
            // Attempt to find transaction by id
            Transaction? transaction = Transactions.FirstOrDefault(t => t.Id == id);

            // Check if transaction is null
            if (transaction == null)
            {
                Console.WriteLine("Transaction not found");
                return null;
            }

            Console.WriteLine($"transaction {transaction!.Id} Retrieved ");
            return transaction;
        }

        // PUT
        //
        public bool EditTransaction(Transaction transaction)
        {
            // Check if transaction is null
            if (transaction == null)
            {
                Console.WriteLine("Transaction not found");
                return false;
            }

            // Check if transaction exists
            if (!Transactions.Any(t => t.Id == transaction.Id))
            {
                Console.WriteLine("Transaction not found");
                return false;
            }

            try
            {
                Transactions.Update(transaction);
                SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }


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
                SaveChanges();
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