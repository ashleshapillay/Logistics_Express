using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicePlansController : Controller
    {
        private readonly DataContext dataContext;

        public ServicePlansController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        //Get All Service Plans
        [HttpGet]
        public async Task<IActionResult> GetAllServicePlans() 
        {
            var servicePlans = await dataContext.ServicePlans.ToListAsync();
            return Ok(servicePlans);
        }

        //Get single Service Plan
        [HttpGet]
        [Route("{Id:int}")]
        [ActionName("GetServicePlan")]
        public async Task<IActionResult> GetServicePlan([FromRoute] int id)
        {
            var servicePlan = await dataContext.ServicePlans.FirstOrDefaultAsync(x => x.ServicePlanId == id);
            if (servicePlan != null)
            {
                return Ok(servicePlan);
            }

            return NotFound("Service Plan cannot be found");
        }


        //Add Service Plan 
        [HttpPost]

        public async Task<IActionResult> AddServicePlan(ServicePlan servicePlan)
        {
            dataContext.Add(servicePlan);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddServicePlan), new {id = servicePlan.ServicePlanId}, servicePlan);
        }

        //Updating Service Plan
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateServicePlan([FromRoute] int id, [FromBody] ServicePlan servicePlan)
        {
            var existingServicePlan = await dataContext.ServicePlans.FirstOrDefaultAsync(x => x.ServicePlanId == id);
            if(existingServicePlan != null)
            {
                existingServicePlan.ServicePlanId = servicePlan.ServicePlanId;
                existingServicePlan.Date = servicePlan.Date;
                existingServicePlan.Type = servicePlan.Type;
                existingServicePlan.ServicePlanDescription = servicePlan.ServicePlanDescription;
                await dataContext.SaveChangesAsync();
                return Ok(existingServicePlan);
            }

            return NotFound("Service Plan cannot be found");
        }

        //Delete Service Plan
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteServicePlan([FromRoute] int id)
        {
            var existingServicePlan = await dataContext.ServicePlans.FirstOrDefaultAsync(x => x.ServicePlanId == id);
            if (existingServicePlan != null)
            {
                dataContext.Remove(existingServicePlan);
                await dataContext.SaveChangesAsync();
                return Ok(existingServicePlan);
            }

            return NotFound("Service Plan cannot be found");
        }
    }
}
