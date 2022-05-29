using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class FuelLog
    {
        [Key]
        public int FuelEntryId { get; set; }
        public DateTime Log_Date { get; set; }
        public decimal Litres { get; set; }
        public decimal Price_Per_Litre { get; set; }
        public decimal Total_Spent { get; set; }
        public string ReceiptImage { get; set; } = String.Empty;

        [JsonIgnore]
        public Vehicle? Vehicle { get; set; } //Many fuel entries for 1 Vehicle
        public int VehicleId { get; set; }
    }
}
