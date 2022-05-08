using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LocationAPI.Models
{
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
        public string Name { get; set; } = String.Empty;

    }
}
