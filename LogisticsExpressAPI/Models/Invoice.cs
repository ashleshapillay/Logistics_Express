using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LogisticsExpressAPI.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }

        //Date
        public DateTime Invoice_Date { get; set; }

    }
}
