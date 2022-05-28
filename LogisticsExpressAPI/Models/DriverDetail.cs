using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class DriverDetail
    {
        [Key]
        public int DriverDetailId { get; set; }
        public string? LicenseNumber { get; set; }
        public string LicenseCopy { get; set; } = string.Empty;
        public string? LicenseExpiryDate { get; set; }
        public string? LicenseCode { get; set; }
        public string? LicenseCodeDescription { get; set; }

        [JsonIgnore]
        public Employee? Employee { get; set; }
        public int EmployeeId { get; set; }

        //public Employee Employee { get; set; } //one to one


    }
}
