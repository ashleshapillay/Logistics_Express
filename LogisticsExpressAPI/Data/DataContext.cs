using LogisticsExpressAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerContact> CustomerContacts { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Subcontractor> Subcontractor { get; set; }
        public DbSet<SubcontractorContacts> SubcontractorContacts { get; set; }
        public DbSet<Suburb> Suburbs { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeRole> EmployeeRoles { get; set; }
        public DbSet<FuelLog> FuelLogs { get; set; }
        public DbSet<RepairRequests> RepairRequests { get; set; }


    }
}
