using System.ComponentModel.DataAnnotations;

namespace LogisticsExpressAPI.Models
{
    public class Repair
    {
        [Key]
        public int RepairId { get; set; }

        public DateTime DateCompleted { get; set; } 

        public string Description { get; set; }

        public double Cost { get; set; }

        public string MechanicName { get; set; }

        public string MechanicContact { get; set; }


    }
}
