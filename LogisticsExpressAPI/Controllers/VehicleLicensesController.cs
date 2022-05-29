using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class VehicleLicensesController : Controller
    {

        private readonly DataContext dataContext;

        public VehicleLicensesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        //Get All Vehicle Licenses
        [HttpGet]
        public async Task<IActionResult> GetAllVehicleLicenses()
        {
            var vehicleLicenses = await dataContext.VehicleLicenses.ToListAsync();
            return Ok(vehicleLicenses);
        }

        //Get single Vehicle License 
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVehicleLicense")]
        public async Task<IActionResult> GetVehicleLicense([FromRoute] int id)
        {
            var vehicleLicense = await dataContext.VehicleLicenses.FirstOrDefaultAsync(x => x.VehicleLicenseId == id);
            if (vehicleLicense != null)
            {
                return Ok(vehicleLicense);
            }

            return NotFound("Vehicle License cannot be found");
        }


        //Add Vehicle License 
        [HttpPost]

        public async Task<IActionResult> AddVehicleLicense(VehicleLicense vehicleLicense)
        {
            dataContext.Add(vehicleLicense);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddVehicleLicense), vehicleLicense.VehicleLicenseId, vehicleLicense);
        }

        //Updating Vehicle License
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateVehicleLicense([FromRoute] int id, [FromBody] VehicleLicense vehicleLicense)
        {
            var existingVehicleLicense = await dataContext.VehicleLicenses.FirstOrDefaultAsync(x => x.VehicleLicenseId == id);
            if (existingVehicleLicense!= null)
            {
                existingVehicleLicense.VehicleLicenseId = vehicleLicense.VehicleLicenseId;
                existingVehicleLicense.VehicleIdentificationNumber = vehicleLicense.VehicleIdentificationNumber;
                existingVehicleLicense.EngineNumber = vehicleLicense.EngineNumber;
                await dataContext.SaveChangesAsync();
                return Ok(existingVehicleLicense);
            }

            return NotFound("Vehicle License cannot be found");
        }

        //Delete Vehicle License
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteVehicleLicense([FromRoute] int id)
        {
            var existingVehicleLicense = await dataContext.VehicleLicenses.FirstOrDefaultAsync(x => x.VehicleLicenseId == id);
            if (existingVehicleLicense != null)
            {
                dataContext.Remove(existingVehicleLicense);
                await dataContext.SaveChangesAsync();
                return Ok(existingVehicleLicense);
            }

            return NotFound("Vehicle License cannot be found");
        }
    }
}
