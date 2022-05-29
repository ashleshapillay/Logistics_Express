using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace LogisticsExpressAPI.Models
{
    public class VehicleModel
    {
        [Key]
        public int VehicleModelID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        //[JsonIgnore]
        //public VehicleMake? VehicleMake { get; set; }
        //public int VehicleMakeID { get; set; }

    }
}
