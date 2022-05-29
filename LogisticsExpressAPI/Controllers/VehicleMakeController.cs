using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleMakeController : Controller
    {
        private readonly DataContext dataContext;

        public VehicleMakeController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

     

        [HttpGet]
        public async Task<IActionResult> GetAllVehicleMakes()
        {
            var makes = await dataContext.VehicleMakes.ToListAsync();
            return Ok(makes);
        }

        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVehicleMake")]
        public async Task<IActionResult> GetVehicleMake([FromRoute] int id)
        {
            var make = await dataContext.VehicleMakes.FirstOrDefaultAsync(x => x.VehicleMakeID == id);
            if (make != null)
            {
                return Ok(make);
            }
            return NotFound("Vehicle Make not found");
        }

        //[HttpPost]
        //public async Task<IActionResult> AddVehicleMake(VehicleMake make)
        //{
        //    dataContext.VehicleMakes.Add(make);
        //    await dataContext.SaveChangesAsync();

        //    return CreatedAtAction("GetVehicleMake", new { id = make.VehicleTypeID }, make);

        //}


        [HttpPost]
        public async Task<IActionResult> PostVehicleMake([FromBody] VehicleMake vehicleMake)
        {
            var newMake = new VehicleMake
            {
                Name = vehicleMake.Name,
                Description = vehicleMake.Description
            };
            dataContext.VehicleMakes.Add(newMake);
            await dataContext.SaveChangesAsync();

            return await GetVehicleMake(newMake.VehicleMakeID);
        }

        //Delete a Vehicle Make
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteVehicleMake([FromRoute] int id)
        {
            var existingModel = await dataContext.VehicleMakes.FirstOrDefaultAsync(x => x.VehicleMakeID == id);
            if (existingModel != null)
            {
                dataContext.Remove(existingModel);
                await dataContext.SaveChangesAsync();
                return Ok(existingModel);
            }
            return NotFound("Vehicle Make not found");
        }


        //private readonly DataContext datacontext;

        //public VehicleMakeController(DataContext context)
        //{
        //    this.datacontext = context;
        //}

        //[HttpGet] //single VehicleMake
        //[Route("{id:int}")]
        //[ActionName("GetVehicleMake")]
        //public async Task<IActionResult> GetVehicleMake([FromRoute] int id)
        //{
        //    var make = await datacontext.VehicleMakes.FirstOrDefaultAsync(x => x.VehicleMakeID == id);
        //    if (make != null)
        //    {
        //        return Ok(make);
        //    }
        //    return NotFound("Vehicle Make not found");
        //}

        ////Get all Makes
        //[HttpGet]
        //public async Task<IActionResult> GetAllVehicleMakes()
        //{
        //    var makes = await datacontext.VehicleMakes.ToListAsync();
        //    return Ok(makes);
        //}

        ////Add a make
        //[HttpPost]
        //public async Task<IActionResult> AddVehicleMake(VehicleMake VehicleMake)
        //{
        //    datacontext.VehicleMakes.Add(VehicleMake);
        //    await datacontext.SaveChangesAsync();

        //    return CreatedAtAction("GetVehicleMake", new { id = VehicleMake.VehicleTypeID }, VehicleMake);

        //}

        //[HttpPost]
        //public async Task<ActionResult<VehicleMake>> PostVehicleMake(CreateVehicleMakeDto makeReq)
        //{
        //    var make = await datacontext.VehicleTypes.FindAsync(makeReq.VehicleTypeID);

        //    if (datacontext == null)
        //        return NotFound();

        //    var newMake = new VehicleMake
        //    {
        //        Name = makeReq.Name,
        //        Description = makeReq.Description,
        //        VehicleTypeID = make.VehicleTypeID
        //    };

        //    datacontext.VehicleMakes.Add(newMake);
        //    await datacontext.SaveChangesAsync();

        //    return await GetVehicleMake(newMake.VehicleTypeID);
        //}




    }
}
