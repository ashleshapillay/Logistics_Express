using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VATController : ControllerBase
    {
        private readonly DataContext dataContext;

        public VATController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //get VAT
        //List
        [HttpGet]
        public async Task<IActionResult> GetVATEntries()
        {
            var VAT = await dataContext.VATs.ToListAsync();
            return Ok(VAT);
        }
        //Just the first VAT entry
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetVAT")]
        public async Task<IActionResult> GetVAT([FromRoute] int id)
        {
            var vat = await dataContext.VATs.FirstOrDefaultAsync(x => x.VATId == id);
            if (vat != null)
            {
                return Ok(vat);
            }
            return NotFound("Entry not found");
        }

        //Create VAT
        [HttpPost]
        public async Task<IActionResult> CreateVAT([FromBody] VAT vat)
        {
            var newVAT = new VAT
            {
                VATPercentage = vat.VATPercentage
            };
            dataContext.VATs.Add(newVAT);
            await dataContext.SaveChangesAsync();
            return Ok("VAT percentage added to the system.");
        }

        //Edit VAT
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditVAT([FromBody] VAT vat)
        {
            var existingVAT = await dataContext.VATs.FirstOrDefaultAsync(x => x.VATId == 1);
            if (existingVAT != null)
            {
                existingVAT.VATPercentage = vat.VATPercentage;
                await dataContext.SaveChangesAsync();
                return Ok(existingVAT);
            }
            return NotFound("VAT entry not found");

        }
    }
}
