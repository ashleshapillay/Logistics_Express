using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class CustomerContact
    {
        [Key]
        public int CustomerContactId { get; set; }

        public string ContactName { get; set; }

        public string EmailAddress { get; set; }

        public string PhoneNumber { get; set; }

        [JsonIgnore]
        public Customer? Customer { get; set; }
        public int CustomerId { get; set; }
    }
}
