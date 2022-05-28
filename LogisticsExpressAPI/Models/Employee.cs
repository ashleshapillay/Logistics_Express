using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string Surname { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public string Email{ get; set; } = String.Empty;

        [JsonIgnore]
        public EmployeeRole? EmployeeRole { get; set; } //MANY employees ONE employee role
        public int EmployeeRoleId { get; set; }

        //[JsonIgnore]
        //public DriverDetail DriverDetail { get; set; } //one to one

        public DriverDetail? DriverDetail { get; set; }
        


    }
}
