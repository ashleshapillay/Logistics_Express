using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class ServicePlan
    {
        [Key]
        public int ServicePlanId { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }
        
        public string ServicePlanDescription { get; set; }

    }
}
