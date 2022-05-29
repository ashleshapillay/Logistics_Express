using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RepairsController : Controller
    {

        private readonly DataContext dataContext;

        public RepairsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        //Get All Repairs
        [HttpGet]
        public async Task<IActionResult> GetAllRepairs()
        {
            var repairs = await dataContext.Repairs.ToListAsync();
            return Ok(repairs);
        }

        //Get single Repair
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetRepair")]
        public async Task<IActionResult> GetRepair([FromRoute] int id)
        {
            var repair = await dataContext.Repairs.FirstOrDefaultAsync(x => x.RepairId == id);
            if (repair != null)
            {
                return Ok(repair);
            }

            return NotFound("Repair cannot be found");
        }


        //Add Repair
        [HttpPost]

        public async Task<IActionResult> AddRepair([FromBody] Repair repair)
        {
            dataContext.Add(repair);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddRepair), repair.RepairId, repair);
        }

        //Update Repair
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateRepair([FromRoute] int id, [FromBody] Repair repair)
        {
            var existingRepair = await dataContext.Repairs.FirstOrDefaultAsync(x => x.RepairId == id);
            if (existingRepair != null)
            {
                existingRepair.RepairId = repair.RepairId;
                existingRepair.DateCompleted = repair.DateCompleted;
                existingRepair.Description = repair.Description;
                existingRepair.Cost = repair.Cost;
                existingRepair.MechanicName = existingRepair.MechanicName;
                existingRepair.MechanicContact = repair.MechanicContact;

                await dataContext.SaveChangesAsync();
                return Ok(existingRepair);
            }

            return NotFound("Repair cannot be found");
        }

        //Delete Repair 
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteRepair ([FromRoute] int id)
        {
            var existingRepair = await dataContext.Repairs.FirstOrDefaultAsync(x => x.RepairId == id);
            if (existingRepair != null)
            {
                dataContext.Remove(existingRepair);
                await dataContext.SaveChangesAsync();
                return Ok(existingRepair);
            }

            return NotFound("Repair cannot be found");
        }

   
    }
}
