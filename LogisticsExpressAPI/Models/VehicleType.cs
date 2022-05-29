using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class VehicleType
    {
        [Key]
        public int VehicleTypeID { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;

    }
}
