using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Iteration_6.Models
{
    public class LoadConfirmation
    {
        [Key]
        public int LoadConfirmationID { get; set; }
        public DateTime DateIssued { get; set; } 
        public string Notes { get; set; } = String.Empty;

        [JsonIgnore]
        public Quotation? Quotation { get; set; } //MANY Load confirmations generated by ONE Quotation
        public int QuotationId { get; set; }

        //[JsonIgnore]
        //public DriverDetail DriverDetail { get; set; } //one to one

        


    }
}
