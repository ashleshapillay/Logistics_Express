using System.ComponentModel.DataAnnotations;


namespace LogisticsExpressAPI.Models
{
    public class InsurancePlan
    {
        [Key]

        public int InsurancePlanId { get; set; }

        public string Provider { get; set; }

        public DateTime DateOfIssue { get; set; }

        public double Cost { get; set; }
    }
}
