using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class RepairRequests
    {
        [Key]
        public int RepairRequestId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;

        [JsonIgnore]
        public Vehicle? Vehicle { get; set; } //Many repair requests for 1 Vehicle
        public int VehicleId { get; set; }

    }
}