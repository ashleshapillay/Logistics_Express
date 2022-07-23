using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Dto;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {

        private readonly DataContext _context;

        public QuotesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            return await _context.Quotes.ToListAsync();
        }

        // GET api/<QuotesController>/5
        [HttpGet]
        [Route("{QuoteId}")]
        public async Task<ActionResult<Quote>> GetQuote(int QuoteId)
        {
            var quote = await _context.Quotes
                .Where(c => c.QuoteId == QuoteId)
                .ToListAsync();

            if (quote == null)
            {
                return NotFound();
            }

            return Ok(quote);
        }

        // POST api/<QuotesController>
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(CreateQuoteDto request)
        {
            var contact = await _context.Customers.FindAsync(request.customerId);

            if (contact == null)
                return NotFound();

            var newQuote = new Quote
            {
                PickUpAddress = request.PickUpAddress,
                DropOffAddress = request.DropOffAddress,
                Description = request.Description,
                Quote_Date = request.Quote_Date,
                Rate = request.Rate,
                CustomerId = contact.CustomerId
            };

            _context.Quotes.Add(newQuote);
            await _context.SaveChangesAsync();

            return await GetQuote(newQuote.QuoteId);
        }

        // PUT api/<QuotesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(int id, Quote quote)
        {
            if (id != quote.QuoteId)
            {
                return BadRequest();
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<QuotesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool QuoteExists(int id)
        {
            return _context.Quotes.Any(e => e.QuoteId == id);
        }
    }
}
