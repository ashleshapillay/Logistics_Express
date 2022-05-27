using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepairRequestController : ControllerBase
    {
        private readonly DataContext dataContext;

        public RepairRequestController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all repair requests
        [HttpGet]
        public async Task<IActionResult> GetAllRepairRequests()
        {
            var requests = await dataContext.RepairRequests.ToListAsync();
            return Ok(requests);
        }

        //Get single repair request
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetRepairRequest")]
        public async Task<IActionResult> GetRepairRequest([FromRoute] int id)
        {
            var request = await dataContext.RepairRequests.FirstOrDefaultAsync(x => x.RepairRequestId == id);
            if (request != null)
            {
                return Ok(request);
            }
            return NotFound("Repair request not found");
        }

        //Add a repair request
        [HttpPost]
        public async Task<IActionResult> AddRepairRequest(RepairRequests repairRequests)
        {
            dataContext.RepairRequests.Add(repairRequests);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetRepairRequest", new { id = repairRequests.RepairRequestId }, repairRequests);

        }

        //Update a repair request
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateRepairRequest([FromRoute] int id, [FromBody] RepairRequests repairRequests)
        {
            var existingRepairRequest = await dataContext.RepairRequests.FirstOrDefaultAsync(x => x.RepairRequestId == id);
            if (existingRepairRequest != null)
            {
                existingRepairRequest.Date = repairRequests.Date;
                existingRepairRequest.Description = repairRequests.Description;
                await dataContext.SaveChangesAsync();
                return Ok(existingRepairRequest);
            }
            return NotFound("Repair request not found");

        }

        //Delete a repair request
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteRepairRequest([FromRoute] int id)
        {
            var existingRepairRequest = await dataContext.RepairRequests.FirstOrDefaultAsync(x => x.RepairRequestId == id);
            if (existingRepairRequest != null)
            {
                dataContext.Remove(existingRepairRequest);
                await dataContext.SaveChangesAsync();
                return Ok(existingRepairRequest);
            }
            return NotFound("Repair request not found");
        }
    }
}
