using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class VAT
    {
        [Key]
        public int VATId { get; set; }
        public double VATPercentage { get; set; }
    }
}
