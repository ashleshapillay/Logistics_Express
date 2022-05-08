#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubcontractorAPI.Data;
using SubcontractorAPI.Dto;
using SubcontractorAPI.Models;

namespace SubcontractorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcontractorContactsController : ControllerBase
    {
        private readonly DataContext _context;

        public SubcontractorContactsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SubcontractorContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubcontractorContacts>>> GetSubcontractorContacts()
        {
            return await _context.SubcontractorContacts.ToListAsync();
        }


        [HttpGet]
        [Route("{SubcontractorId}")]
        public async Task<ActionResult<SubcontractorContacts>> GetSubcontractorContacts(int SubcontractorId)
        {
            var subcontractorContact = await _context.SubcontractorContacts
                .Where(c => c.SubcontractorId == SubcontractorId)
                .ToListAsync();

            if (subcontractorContact == null)
            {
                return NotFound();
            }

            return Ok(subcontractorContact);
        }


        // PUT: api/SubcontractorContacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubcontractorContacts(int id, SubcontractorContacts subcontractorContacts)
        {
            if (id != subcontractorContacts.SubcontractorContactId)
            {
                return BadRequest();
            }

            _context.Entry(subcontractorContacts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubcontractorContactsExists(id))
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

        // POST: api/SubcontractorContacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubcontractorContacts>> PostSubcontractorContacts(CreateSubcontractorContact request)
        {
            var contact = await _context.Subcontractor.FindAsync(request.SubcontractorId);

            if (contact == null)
                return NotFound();

            var newContact = new SubcontractorContacts
            {
                SubcontractorName = request.Name,
                EmailAddress = request.Address,
                PhoneNumber = request.Number,
                SubcontractorId = contact.SubcontractorId
            };

            _context.SubcontractorContacts.Add(newContact);
            await _context.SaveChangesAsync();

            return await GetSubcontractorContacts(newContact.SubcontractorId);
        }

        // DELETE: api/SubcontractorContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubcontractorContacts(int id)
        {
            var subcontractorContacts = await _context.SubcontractorContacts.FindAsync(id);
            if (subcontractorContacts == null)
            {
                return NotFound();
            }

            _context.SubcontractorContacts.Remove(subcontractorContacts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubcontractorContactsExists(int id)
        {
            return _context.SubcontractorContacts.Any(e => e.SubcontractorContactId == id);
        }
    }
}
