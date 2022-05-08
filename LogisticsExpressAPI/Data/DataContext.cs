using LogisticsExpressAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeRole> EmployeeRoles { get; set; }
    }
}
