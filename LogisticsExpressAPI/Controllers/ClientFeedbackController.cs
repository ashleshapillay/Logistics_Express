using Iteration_6.Data;
using Iteration_6.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Iteration_6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientFeedbackController : ControllerBase
    {
        private readonly DataContext dataContext;

        public ClientFeedbackController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all feedback
        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            var clientfeedbacks = await dataContext.ClientFeedbacks.ToListAsync();
            return Ok(clientfeedbacks);
        }

        //Get a feedback
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetFeedback")]
        public async Task<IActionResult> GetFeedback([FromRoute] int id)
        {
            var feedback = await dataContext.ClientFeedbacks.FirstOrDefaultAsync(x => x.FeedbackID == id);
            if (feedback != null)
            {
                return Ok(feedback);
            }
            return NotFound("Feedback not found");
        }

        //Add customer feedback
        [HttpPost]
        public async Task<IActionResult> AddFeedback(ClientFeedback clientFeedback)
        {
            dataContext.ClientFeedbacks.Add(clientFeedback);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetFeedback", new { id = clientFeedback.CustomerId }, clientFeedback);

        }

        //Update feedback
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateFeedback([FromRoute] int id, [FromBody] ClientFeedback clientFeedback)
        {
            var existingFeedback = await dataContext.ClientFeedbacks.FirstOrDefaultAsync(x => x.FeedbackID == id);
            if (existingFeedback != null)
            {

                existingFeedback.Description = clientFeedback.Description;
                existingFeedback.Rating = clientFeedback.Rating;
                existingFeedback.CustomerId = clientFeedback.CustomerId;
                await dataContext.SaveChangesAsync();
                return Ok(existingFeedback);
            }
            return NotFound("Feedback not found");

        }

        //Delete feedback
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteFeedback([FromRoute] int id)
        {
            var existingFeedback = await dataContext.ClientFeedbacks.FirstOrDefaultAsync(x => x.FeedbackID == id);
            if (existingFeedback != null)
            {
                dataContext.Remove(existingFeedback);
                await dataContext.SaveChangesAsync();
                return Ok(existingFeedback);
            }
            return NotFound("Feedback not found");
        }
    }
}

