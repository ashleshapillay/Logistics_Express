using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class EmployeeRole
    {
        [Key]
        public int EmployeeRoleId { get; set; }
        public string EmployeeDescription { get; set; } = String.Empty;
    }
}
