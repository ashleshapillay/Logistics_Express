using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocationAPI.Models
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        public int StreetNumber { get; set; }
        public string StreetName { get; set; }

        [JsonIgnore]
        public Suburb? Suburb { get; set; } //MANY addresses ONE suburb
        public int SuburbId { get; set; }
    }
}
