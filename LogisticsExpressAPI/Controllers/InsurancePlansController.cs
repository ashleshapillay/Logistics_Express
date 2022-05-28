using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class InsurancePlansController : Controller
    {
        private readonly DataContext dataContext;

        public InsurancePlansController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        //Get All Insurance Plans
        [HttpGet]
        public async Task<IActionResult> GetAllInsurancePlans()
        {
            var insurancePlans = await dataContext.InsurancePlans.ToListAsync();
            return Ok(insurancePlans);
        }

        //Get single Insurance Plan
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetInsurancePlan")]
        public async Task<IActionResult> GetInsurancePlan([FromRoute] int id)
        {
            var insurancePlan = await dataContext.InsurancePlans.FirstOrDefaultAsync(x => x.InsurancePlanId == id);

            if (insurancePlan != null)
            {
                return Ok(insurancePlan);
            }

            return NotFound("Insurance Plan cannot be found");
        }


        //Add Insurance Plan 
        [HttpPost]
        [ActionName("AddInsurancePlan")]
        public async Task<IActionResult> AddInsurancePlan( InsurancePlan insurancePlan)
        {
            dataContext.Add(insurancePlan);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddInsurancePlan), insurancePlan.InsurancePlanId, insurancePlan);
        }

        //Updating Insurance Plan
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateInsurancePlan([FromRoute] int id, [FromBody] InsurancePlan insurancePlan)
        {
            var existingInsurancePlan = await dataContext.InsurancePlans.FirstOrDefaultAsync(x => x.InsurancePlanId == id);
            if (existingInsurancePlan != null)
            {
                existingInsurancePlan.InsurancePlanId = insurancePlan.InsurancePlanId;
                existingInsurancePlan.Provider = insurancePlan.Provider;
                existingInsurancePlan.DateOfIssue = insurancePlan.DateOfIssue;
                
                await dataContext.SaveChangesAsync();
                return Ok(existingInsurancePlan);
            }

            return NotFound("Insurance Plan cannot be found");
        }


        //Delete Insurance Plan
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteInsurancePlan([FromRoute] int id)
        {
            var existingInsurancePlan = await dataContext.InsurancePlans.FirstOrDefaultAsync(x => x.InsurancePlanId == id);
            if (existingInsurancePlan != null)
            {
                dataContext.Remove(existingInsurancePlan);
                await dataContext.SaveChangesAsync();
                return Ok(existingInsurancePlan);
            }

            return NotFound("Insurance Plan cannot be found");
        }

    }
}
