using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; }
    }
}
