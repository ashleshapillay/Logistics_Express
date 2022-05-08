#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using LogisticsExpressAPI.Dto;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerContactsController : ControllerBase
    {
        private readonly DataContext _context;

        public CustomerContactsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/CustomerContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerContact>>> GetCustomerContacts()
        {
            return await _context.CustomerContacts.ToListAsync();
        }


        [HttpGet]
        [Route("{CustomerId}")]
        public async Task<ActionResult<CustomerContact>> GetCustomerContact(int CustomerId)
        {
            var customerContact = await _context.CustomerContacts
                .Where(c => c.CustomerId == CustomerId)
                .ToListAsync();

            if (customerContact == null)
            {
                return NotFound();
            }

            return Ok(customerContact);
        }



        // PUT: api/CustomerContacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerContact(int id, CustomerContact customerContact)
        {
            if (id != customerContact.CustomerContactId)
            {
                return BadRequest();
            }

            _context.Entry(customerContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerContactExists(id))
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

        // POST: api/CustomerContacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerContact>> PostCustomerContact(CreateCustomerContactDto request)
        {
            var contact = await _context.Customers.FindAsync(request.customerId);

            if (contact == null)
                return NotFound();

            var newContact = new CustomerContact
            {
                ContactName = request.Name,
                EmailAddress = request.Address,
                PhoneNumber = request.Number,
                CustomerId = contact.CustomerId
            };

            _context.CustomerContacts.Add(newContact);
            await _context.SaveChangesAsync();

            return await GetCustomerContact(newContact.CustomerId);
        }

        // DELETE: api/CustomerContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerContact(int id)
        {
            var customerContact = await _context.CustomerContacts.FindAsync(id);
            if (customerContact == null)
            {
                return NotFound();
            }

            _context.CustomerContacts.Remove(customerContact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerContactExists(int id)
        {
            return _context.CustomerContacts.Any(e => e.CustomerContactId == id);
        }
    }
}
