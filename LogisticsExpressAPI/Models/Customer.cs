using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        public string BusinessName { get; set; }

        public string EmailAddress { get; set; }

        public string PhoneNumber { get; set; }

    }
}
