using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class VehicleLicense
    {
        [Key]
        
        public int VehicleLicenseId { get; set; }

        public string VehicleIdentificationNumber { get; set; }

        public string EngineNumber { get; set; }
    }
}
