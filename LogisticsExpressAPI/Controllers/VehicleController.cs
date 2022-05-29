using Microsoft.AspNetCore.Mvc;
using Vehicle_Part2_API.Models;
using Vehicle_Part2_API.Data;
using Microsoft.EntityFrameworkCore;
using Vehicle_Part2_API.Dto;

namespace Vehicle_Part2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : Controller
    {

        private readonly DataContext dataContext;
        public VehicleController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicle()
        {
            var vehicle = await dataContext.Vehicles.ToListAsync();
            return Ok(vehicle);
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVehicle")]
        public async Task<IActionResult> GetVehicle([FromRoute] int id)
        {
            var vehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);

            if (vehicle != null)
            {
                return Ok(vehicle);
            }
            return NotFound("Vehicle Driver not found");

        }

        [HttpPost]
        public async Task<IActionResult> PostVehicleDriver(Vehicle vehicle)
        {
            dataContext.Vehicles.Add(vehicle);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetVehicle", new { id = vehicle.VehicleModelID }, vehicle);

        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateVehicle([FromRoute] int id, [FromBody] Vehicle vehicle)
        {
            var exisitngVehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
            if (exisitngVehicle != null)
            {
                exisitngVehicle.TareWeight = vehicle.TareWeight;
                exisitngVehicle.VehicleMakeID = vehicle.VehicleMakeID;
                exisitngVehicle.VehicleModelID = vehicle.VehicleModelID;
                exisitngVehicle.VehicleTypeID = vehicle.VehicleTypeID;
                await dataContext.SaveChangesAsync();
                return Ok(exisitngVehicle);
            }

            return NotFound("Vehicle not found");

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        {
            var exisitngVehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
            if (exisitngVehicle != null)
            {
                dataContext.Remove(exisitngVehicle);
                await dataContext.SaveChangesAsync();
                return Ok(exisitngVehicle);
            }
            return NotFound("Vehicle not found");
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllVehicles()
        //{
        //    var vehicles = await dataContext.Vehicles.ToListAsync();
        //    return Ok(vehicles);
        //}

        //[HttpGet]
        //[Route("{id:int}")]
        //[ActionName("GetVehicle")]
        //public async Task<IActionResult> GetVehicle([FromRoute] int id)
        //{
        //    var vehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
        //    if (vehicle != null)
        //    {
        //        return Ok(vehicle);
        //    }
        //    return NotFound("Vehcile not found");
        //}

        //[HttpGet]
        //public async Task<IActionResult> GetAllVehicles()
        //{
        //    var vehicles = await dataContext.Vehicles.ToListAsync();
        //    return Ok(vehicles);
        //}

        //[HttpGet]
        //[Route("{id:int}")]
        //[ActionName("GetVehicles")]
        //public async Task<IActionResult> GetVehicles([FromRoute] int id)
        //{
        //    var vehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
        //    if (vehicle != null)
        //    {
        //        return Ok(vehicle);
        //    }
        //    return NotFound("Vehicle not found");
        //}



        //[HttpPost]
        //public async Task<IActionResult> PostVehicle([FromBody] Vehicle vehicle)
        //{
        //    var newVehicle = new Vehicle
        //    {
        //        TareWeight = vehicle.TareWeight,

        //    };
        //    dataContext.Vehicles.Add(newVehicle);
        //    await dataContext.SaveChangesAsync();

        //    return await GetVehicle(newVehicle.VehicleID);
        //}

        //[HttpPut]
        //[Route("{id:int}")]
        //public async Task<IActionResult> PutVehicle([FromRoute] int id, [FromBody] Vehicle vehicles)
        //{
        //    var existingVehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
        //    if (existingVehicle != null)
        //    {
        //        existingVehicle.TareWeight = vehicles.TareWeight;
        //        await dataContext.SaveChangesAsync();
        //        return Ok(existingVehicle);
        //    }
        //    return NotFound("Vehicle not found");

        //}



        //[HttpDelete]
        //[Route("{id:int}")]
        //public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        //{
        //    var currentVehicle = await dataContext.Vehicles.FirstOrDefaultAsync(x => x.VehicleID == id);
        //    if (currentVehicle != null)
        //    {
        //        dataContext.Remove(currentVehicle);
        //        await dataContext.SaveChangesAsync();
        //        return Ok(currentVehicle);
        //    }
        //    return NotFound("Vehicle not found");
        //}

    }
}
