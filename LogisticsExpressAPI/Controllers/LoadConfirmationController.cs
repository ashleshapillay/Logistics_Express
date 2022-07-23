using Iteration_6.Data;
using Iteration_6.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Iteration_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoadConfirmationController : ControllerBase
    {
        private readonly DataContext dataContext;

        public LoadConfirmationController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all CONFIMATIONS
        [HttpGet]
        public async Task<IActionResult> GetAllLoadConfirmations()
        {
            var loadConfirmations = await dataContext.LoadConfirmations.ToListAsync();
            return Ok(loadConfirmations);
        }

        //Get a Load Confirmation
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetLoadConfirmation")]
        public async Task<IActionResult> GetLoadConfirmation([FromRoute] int id)
        {
            var loadConfirmation = await dataContext.LoadConfirmations.FirstOrDefaultAsync(x => x.LoadConfirmationID == id);
            if (loadConfirmation != null)
            {
                return Ok(loadConfirmation);
            }
            return NotFound("Load Confirmations not found");
        }

        //Add a Load Confirmation
        [HttpPost]
        public async Task<IActionResult> AddLoadConfirmation(LoadConfirmation loadConfirmation)
        {
            dataContext.LoadConfirmations.Add(loadConfirmation);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetLoadConfirmation", new { id = loadConfirmation.QuotationId }, loadConfirmation);

        }

        //Update LoadConfirmation
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateLoadConfirmation([FromRoute] int id, [FromBody] LoadConfirmation loadConfirmation)
        {
            var existingLoadConfirmation = await dataContext.LoadConfirmations.FirstOrDefaultAsync(x => x.LoadConfirmationID == id);
            if (existingLoadConfirmation != null)
            {

                existingLoadConfirmation.DateIssued = loadConfirmation.DateIssued;
                existingLoadConfirmation.Notes = loadConfirmation.Notes;
                existingLoadConfirmation.QuotationId = loadConfirmation.QuotationId;
                await dataContext.SaveChangesAsync();
                return Ok(existingLoadConfirmation);
            }
            return NotFound("Load Confirmation not found");

        }

        //Delete a Load Confirmation
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteLoadConfirmation([FromRoute] int id)
        {
            var existingLoadConfirmation = await dataContext.LoadConfirmations.FirstOrDefaultAsync(x => x.LoadConfirmationID == id);
            if (existingLoadConfirmation != null)
            {
                dataContext.Remove(existingLoadConfirmation);
                await dataContext.SaveChangesAsync();
                return Ok(existingLoadConfirmation);
            }
            return NotFound("Load Confirmation not found");
        }
    }
}

