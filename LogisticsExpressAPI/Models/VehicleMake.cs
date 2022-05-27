using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
//using Newtonsoft.Json;

namespace LogisticsExpressAPI.Models
{
    public class VehicleMake
    {
        [Key]
        public int VehicleMakeID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        //[JsonIgnore]
        //public VehicleType? VehicleType { get; set; } 
        //public int VehicleTypeID { get; set; }
    }
}
