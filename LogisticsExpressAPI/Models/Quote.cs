using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LogisticsExpressAPI.Models
{
    public class Quote
    {
        [Key]
        public int QuoteId { get; set; }


        //Pick-up Address
        public string PickUpAddress { get; set; }


        //Drop-off Address
        public string DropOffAddress { get; set; }

        //Rate
        public int Rate { get; set; }

        //Date
        public DateTime Quote_Date { get; set; }

        //Description 
        public string Description { get; set; }

        [JsonIgnore]
        public Customer? Customer { get; set; }
        public int CustomerId { get; set; }

    }
}
