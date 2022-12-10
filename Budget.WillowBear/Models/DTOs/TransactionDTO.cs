using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Models.Enums;

namespace Budget.WillowBear.Models.DTOs

{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
        public string? Notes { get; set; }
        public CategoryDTO? Category { get; set; }

        public TransactionType TransactionType { get; set; }
    }
}