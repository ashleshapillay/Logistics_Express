using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class VehicleTypeController : ControllerBase
    {        
        private readonly DataContext dataContext;

        public VehicleTypeController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicleTypes()
        {
            var types = await dataContext.VehicleTypes.ToListAsync();
            return Ok(types);
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVehicleType")]
        public async Task<IActionResult> GetVehicleType([FromRoute] int id)
        {
            var type = await dataContext.VehicleTypes.FirstOrDefaultAsync(x => x.VehicleTypeID == id);
            if (type != null)
            {
                return Ok(type);
            }
            return NotFound("Vehcile Type not found");
        }

        [HttpPost]
        public async Task<IActionResult> PostVehicleType([FromBody] VehicleType vehicleTypes)
        {
            var newType = new VehicleType
            {
                Name = vehicleTypes.Name,
                Description=vehicleTypes.Description
            };
            dataContext.VehicleTypes.Add(newType);
            await dataContext.SaveChangesAsync();

            return await GetVehicleType(newType.VehicleTypeID);
        }


        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutVehicleType(int id, VehicleType types)
        //{
        //    if (id != types.VehicleTypeID)
        //    {
        //        return BadRequest();
        //    }

        //    dataContext.Entry(types).State = EntityState.Modified;

        //    try
        //    {
        //        await dataContext.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TypeExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //private bool TypeExists(int id)
        //{
        //    return dataContext.VehicleTypes.Any(e => e.VehicleTypeID == id);
        //}


        ////Update a Vehicle Type
        //[HttpPut]

        //[Route("{id:int}")]
        //public async Task<IActionResult> UpdateVehicleType([FromRoute] int id, [FromBody] VehicleType type)
        //{
        //    var existingType = await dataContext.VehicleTypes.FirstOrDefaultAsync(x => x.VehicleTypeID == id);
        //    if (existingType != null)
        //    {
        //        existingType.Name = type.Name;
        //        await dataContext.SaveChangesAsync();
        //        return Ok(existingType);
        //    }
        //    return NotFound("Vehicle Type not found");

        //}

        ////Delete a Vehicle Type
        //[HttpDelete]
        //[Route("{id:int}")]
        //public async Task<IActionResult> DeleteVehicleType([FromRoute] int id)
        //{
        //    var existingType = await dataContext.VehicleTypes.FirstOrDefaultAsync(x => x.VehicleTypeID == id);
        //    if (existingType != null)
        //    {
        //        dataContext.Remove(existingType);
        //        await dataContext.SaveChangesAsync();
        //        return Ok(existingType);
        //    }
        //    return NotFound("Vehicle Type not found");
        //}

    }
}
