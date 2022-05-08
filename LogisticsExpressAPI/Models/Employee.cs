using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string Emp_PhoneNumber { get; set; } = String.Empty;
        public string Emp_Email { get; set; } = String.Empty;
        public string Emp_Contact { get; set; } = String.Empty;
        public string Emp_FirstName { get; set; } = String.Empty;
        public string Emp_LastName { get; set; } = String.Empty;

        [JsonIgnore]
        public EmployeeRole? EmployeeRole { get; set; } //MANY employees ONE employee role
        public int EmployeeRoleId { get; set; }
    }
}
