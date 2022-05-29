using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuelController : ControllerBase
    {
        private readonly DataContext dataContext;

        public FuelController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all fuel entries
        [HttpGet]
        public async Task<IActionResult> GetAllFuelEntries()
        {
            var fuel = await dataContext.FuelLogs.ToListAsync();
            return Ok(fuel);
        }

        //Get single fuel entry
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetFuelEntry")]
        public async Task<IActionResult> GetFuelEntry([FromRoute] int id)
        {
            var fuel = await dataContext.FuelLogs.FirstOrDefaultAsync(x => x.FuelEntryId == id);
            if (fuel != null)
            {
                return Ok(fuel);
            }
            return NotFound("Fuel entry not found");
        }
        


        //Add a fuel entry
        [HttpPost]
        public async Task<IActionResult> AddFuelEntry(FuelLog fuelLog)
        {
            dataContext.FuelLogs.Add(fuelLog);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetFuelEntry", new { id = fuelLog.FuelEntryId }, fuelLog);

            //IMAGE
        }


        //Update a fuel entry
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateFuelEntryt([FromRoute] int id, [FromBody] FuelLog fuelLog)
        {
            var existingFuelEntry = await dataContext.FuelLogs.FirstOrDefaultAsync(x => x.FuelEntryId == id);
            if (existingFuelEntry != null)
            {
                existingFuelEntry.Log_Date = fuelLog.Log_Date;
                existingFuelEntry.Litres = fuelLog.Litres;
                existingFuelEntry.Price_Per_Litre = fuelLog.Price_Per_Litre;
                existingFuelEntry.Total_Spent = fuelLog.Total_Spent;
                existingFuelEntry.ReceiptImage = fuelLog.ReceiptImage;

                await dataContext.SaveChangesAsync();
                return Ok(existingFuelEntry);
            }
            return NotFound("Fuel entry not found");

        }

        //Delete a fuel entry
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteFuelEntry([FromRoute] int id)
        {
            var existingFuelEntry = await dataContext.FuelLogs.FirstOrDefaultAsync(x => x.FuelEntryId == id);
            if (existingFuelEntry != null)
            {
                dataContext.Remove(existingFuelEntry);
                await dataContext.SaveChangesAsync();
                return Ok(existingFuelEntry);
            }
            return NotFound("Fuel entry not found");
        }

    }
}
