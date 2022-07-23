using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeliveryNote.Data;
using DeliveryNote.Model;
namespace DeliveryNote.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryNoteController : ControllerBase
    {

        private readonly DataContext _context;

        public DeliveryNoteController(DataContext context)
        {
            _context = context;
        }

        //GET DELIVERY NOTE DATA
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryNotes>>> GetDeliveryNote()
        {
            return await _context.DeliveryNotes.ToListAsync();
        }

        //GET DELIVERY NOTE BY SEARCH
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryNotes>> GetDeliveryNoteList(int id)
        {
            var note = await _context.DeliveryNotes.FindAsync(id);
            if(note == null){
                return NotFound();
            }

            return note ;
        }

    }
}
