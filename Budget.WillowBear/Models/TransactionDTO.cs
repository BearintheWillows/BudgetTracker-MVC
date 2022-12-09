using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Models.Enums;

namespace Budget.WillowBear.Models
{
    public class TransactionDTO
    {
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public string? Notes { get; set; }
        public CategoryDTO? Category { get; set; }

        public TransactionType TransactionType { get; set; }
    }
}