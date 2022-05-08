using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocationAPI.Models
{
    public class City
    {
        [Key]
        public int CityId { get; set; }
        public string Name { get; set; } = String.Empty;

        [JsonIgnore]
        public Province? Province { get; set; } //MANY cities ONE province
        public int ProvinceId { get; set; }
    }
}
