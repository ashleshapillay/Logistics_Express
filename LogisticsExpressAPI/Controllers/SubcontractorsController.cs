#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubcontractorAPI.Data;
using SubcontractorAPI.Models;

namespace SubcontractorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcontractorsController : ControllerBase
    {
        private readonly DataContext _context;

        public SubcontractorsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Subcontractors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subcontractor>>> GetSubcontractor()
        {
            return await _context.Subcontractor.ToListAsync();
        }

        // GET: api/Subcontractors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subcontractor>> GetSubcontractor(int id)
        {
            var subcontractor = await _context.Subcontractor.FindAsync(id);

            if (subcontractor == null)
            {
                return NotFound();
            }

            return subcontractor;
        }

        // PUT: api/Subcontractors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubcontractor(int id, Subcontractor subcontractor)
        {
            if (id != subcontractor.SubcontractorId)
            {
                return BadRequest();
            }

            _context.Entry(subcontractor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubcontractorExists(id))
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

        // POST: api/Subcontractors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subcontractor>> PostSubcontractor(Subcontractor subcontractor)
        {
            _context.Subcontractor.Add(subcontractor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubcontractor", new { id = subcontractor.SubcontractorId }, subcontractor);
        }

        // DELETE: api/Subcontractors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubcontractor(int id)
        {
            var subcontractor = await _context.Subcontractor.FindAsync(id);
            if (subcontractor == null)
            {
                return NotFound();
            }

            _context.Subcontractor.Remove(subcontractor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubcontractorExists(int id)
        {
            return _context.Subcontractor.Any(e => e.SubcontractorId == id);
        }
    }
}
