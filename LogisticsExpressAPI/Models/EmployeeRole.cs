using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeAPI.Models
{
    public class EmployeeRole
    {
        [Key]
        public int EmployeeRoleId { get; set; }
        public string EmployeeDescription { get; set; } = String.Empty;
    }
}
