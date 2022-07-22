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
        [HttpGet]
        public async Task<IActionResult> GetVATPercentage()
        {
            var VAT = await dataContext.VATs.ToListAsync();
            return Ok(VAT);
        }


        //Edit VAT
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditVAT(VAT request)
        {
            var existingVAT = await dataContext.VATs.FirstOrDefaultAsync(x => x.VATId == 1);
                existingVAT.VATPercentage = request.VATPercentage;
                await dataContext.SaveChangesAsync();
                return Ok(existingVAT);
        }
    }
}
