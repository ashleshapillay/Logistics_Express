using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LogisticsExpressAPI.Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; }
        public string TareWeight { get; set; }

        [JsonIgnore]
        public VehicleModel? VehicleModel { get; set; }
        public int VehicleModelID { get; set; }
        public VehicleMake? VehicleMake { get; set; }
        public int VehicleMakeID { get; set; }
        public VehicleType? VehicleType { get; set; }
        public int VehicleTypeID { get; set; }

        //public InsurancePlan? InsurancePlan { get; set; }
        //public int InsurancePlanID { get; set; }

        //public VehicleLisence? VehicleLisence { get; set; }
        //public int VehicleLisenceID { get; set; }

        //public ServicePlan? ServicePlan {get;set;}
        //public int ServicePlanID { get; set; }

    }
}
