using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class EmployeeRole
    {
        [Key]
        public int EmployeeRoleId { get; set; }
        public string EmployeeRoleDescription { get; set; } = String.Empty;
    }
}
