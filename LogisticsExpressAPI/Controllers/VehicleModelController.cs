using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleModelController : Controller
    {
        private readonly DataContext dataContext;

        public VehicleModelController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleModel>>> GetAllVehicleModel()
        {
            return await dataContext.VehicleModels.ToListAsync();
        }



        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVehicleModels")]
        public async Task<IActionResult> GetVehicleModels([FromRoute] int id)
        {
            var models = await dataContext.VehicleModels.FirstOrDefaultAsync(x => x.VehicleModelID == id);
            if (models != null)
            {
                return Ok(models);
            }
            return NotFound("Vehicle Model not found");
        }

        
        [HttpPost]
        public async Task<IActionResult> PostVehicleModel([FromBody] VehicleModel vehicleModel)
        {
            var newModel = new VehicleModel
            {
                Name = vehicleModel.Name,
                Description = vehicleModel.Description
            };
            dataContext.VehicleModels.Add(newModel);
            await dataContext.SaveChangesAsync();

            return await GetVehicleModels(newModel.VehicleModelID);
        }
        
        //Delete a Vehicle Model
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteVehicleModel([FromRoute] int id)
        {
            var existingMake = await dataContext.VehicleModels.FirstOrDefaultAsync(x => x.VehicleModelID == id);
            if (existingMake != null)
            {
                dataContext.Remove(existingMake);
                await dataContext.SaveChangesAsync();
                return Ok(existingMake);
            }
            return NotFound("Vehicle Model not found");
        }


    }
}
