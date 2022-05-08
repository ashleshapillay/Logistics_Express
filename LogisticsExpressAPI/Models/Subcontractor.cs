using System.ComponentModel.DataAnnotations;

namespace SubcontractorAPI.Models
{
    public class Subcontractor
    {
        [Key]
        public int SubcontractorId { get; set; }

        public string? SubcontractorName { get; set; }

        public string? EmailAddress { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
