using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Budget.WillowBear.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Budget.WillowBear.Data
{
    public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transaction");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Notes).HasMaxLength(200);
            builder.Property(t => t.TransactionDate).IsRequired();
            builder.Property(t => t.CreatedDate).IsRequired().HasDefaultValue(DateTime.Now);
            builder.Property(t => t.Amount).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(t => t.TransactionType).IsRequired();
        }
    }
}