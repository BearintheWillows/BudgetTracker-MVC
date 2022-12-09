using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Models.Enums;
using System.Text.Json.Serialization;

namespace Budget.WillowBear.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string? Notes { get; set; }
        public DateTime TransactionDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public decimal Amount { get; set; }
        public TransactionType TransactionType { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Category? Category { get; set; }
        public int CategoryId { get; set; }


    }
}