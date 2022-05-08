using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class Suburb
    {
        [Key]
        public int SuburbId { get; set; }
        public string Name { get; set; } = String.Empty;

        [JsonIgnore]
        public City? City { get; set; } //MANY suburbs ONE city
        public int CityId { get; set; }
    }
}
