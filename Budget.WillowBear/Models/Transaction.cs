using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Models.Enums;

namespace Budget.WillowBear.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public string Notes { get; set; } = string.Empty;

        public DateTime TransactionDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Amount { get; set; }

        public TransactionType TransactionType { get; set; }

    }
}