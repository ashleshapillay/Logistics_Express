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
        public async Task<IActionResult> AddFuelEntry(int vehicleId,decimal litres,decimal priceLitre,decimal totalSpent, IFormFile file)
        {
            FuelLog fuelLog = new FuelLog();
            fuelLog.Log_Date = DateTime.Now;
            fuelLog.Litres = litres;
            fuelLog.Price_Per_Litre = priceLitre;
            fuelLog.Total_Spent = totalSpent;
            fuelLog.Receipt_Image = file.FileName;
            fuelLog.VehicleId = vehicleId;

            dataContext.FuelLogs.Add(fuelLog);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetFuelEntry", new { id = fuelLog.FuelEntryId }, fuelLog);

        }

        //Update a fuel entry
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateFuelEntry([FromRoute] int id, decimal litres, decimal priceLitre, decimal totalSpent, int vehicleId, IFormFile file)
        {
            var existingFuelEntry = await dataContext.FuelLogs.FirstOrDefaultAsync(x => x.FuelEntryId == id);
            if (existingFuelEntry != null)
            {
                existingFuelEntry.Log_Date = DateTime.Now;
                existingFuelEntry.Litres = litres;
                existingFuelEntry.Price_Per_Litre = priceLitre;
                existingFuelEntry.Total_Spent = totalSpent;
                existingFuelEntry.Receipt_Image = file.FileName;
                existingFuelEntry.VehicleId = vehicleId;
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
