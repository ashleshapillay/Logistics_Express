using LogisticsExpressAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set;  }

        public DbSet<CustomerContact> CustomerContacts { get; set; }

        public DbSet<ClientFeedback> ClientFeedbacks { get; set; }
       
    }
}
