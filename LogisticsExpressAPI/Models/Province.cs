using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocationAPI.Models
{
    public class Province
    {
        [Key]
        public int ProvinceId { get; set; }
        public string Name { get; set; } = String.Empty;

        [JsonIgnore]
        public Country? Country { get; set; } //MANY provinces ONE country
        public int CountryId { get; set; } 
    }
}
