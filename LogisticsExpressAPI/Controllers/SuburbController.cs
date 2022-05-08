using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LocationAPI.Data;
using Microsoft.EntityFrameworkCore;
using LocationAPI.Models;

namespace LocationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuburbController : ControllerBase
    {
        private readonly DataContext dataContext;

        public SuburbController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all suburbs
        [HttpGet]
        public async Task<IActionResult> GetAllSuburbs()
        {
            var suburbs = await dataContext.Suburbs.ToListAsync();
            return Ok(suburbs);
        }

        //Get single suburb
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetSuburb")]
        public async Task<IActionResult> GetSuburb([FromRoute] int id)
        {
            var suburb = await dataContext.Suburbs.FirstOrDefaultAsync(x => x.SuburbId == id);
            if (suburb != null)
            {
                return Ok(suburb);
            }
            return NotFound("Suburb not found");
        }

        //Add a suburb
        [HttpPost]
        public async Task<IActionResult> AddSuburb(Suburb suburb)
        {
            dataContext.Suburbs.Add(suburb);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetSuburb", new { id = suburb.CityId }, suburb);
        }

        //Update a suburb
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateSuburb([FromRoute] int id, [FromBody] Suburb suburb)
        {
            var existingSuburb = await dataContext.Suburbs.FirstOrDefaultAsync(x => x.SuburbId == id);
            if (existingSuburb != null)
            {
                existingSuburb.Name = suburb.Name;
                existingSuburb.CityId = suburb.CityId;
                await dataContext.SaveChangesAsync();
                return Ok(existingSuburb);
            }
            return NotFound("Suburb not found");

        }

        //Delete a suburb
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteSuburb([FromRoute] int id)
        {
            var existingSuburb = await dataContext.Suburbs.FirstOrDefaultAsync(x => x.SuburbId == id);
            if (existingSuburb != null)
            {
                dataContext.Remove(existingSuburb);
                await dataContext.SaveChangesAsync();
                return Ok(existingSuburb);
            }
            return NotFound("Suburb not found");
        }
    }
}
