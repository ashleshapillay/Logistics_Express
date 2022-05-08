using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class SubcontractorContacts
    {
        [Key]
        public int SubcontractorContactId { get; set; }

        public string? SubcontractorName { get; set; }

        public string? EmailAddress { get; set; }

        public string? PhoneNumber { get; set; }

        public int SubcontractorId { get; set; }
        public Subcontractor? Subcontractor { get; set; }
    }
}
