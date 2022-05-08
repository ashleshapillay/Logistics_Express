using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models; 

namespace LocationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly DataContext dataContext;

        public AddressController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all addresses
        [HttpGet]
        public async Task<IActionResult> GetAllAddresses()
        {
            var addresses = await dataContext.Addresses.ToListAsync();
            return Ok(addresses);
        }

        //Get single address
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetAddress")]
        public async Task<IActionResult> GetAddress([FromRoute] int id)
        {
            var address = await dataContext.Addresses.FirstOrDefaultAsync(x => x.AddressId == id);
            if (address != null)
            {
                return Ok(address);
            }
            return NotFound("Address not found");
        }

        //Add a address
        [HttpPost]
        public async Task<IActionResult> AddAddress(Address address)
        {
            dataContext.Addresses.Add(address);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new { id = address.SuburbId }, address);
        }

        //Update a address
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAddress([FromRoute] int id, [FromBody] Address address)
        {
            var existingAddress = await dataContext.Addresses.FirstOrDefaultAsync(x => x.AddressId == id);
            if (existingAddress != null)
            {
                existingAddress.StreetNumber = address.StreetNumber;
                existingAddress.StreetName = address.StreetName;
                existingAddress.SuburbId = address.SuburbId;
                await dataContext.SaveChangesAsync();
                return Ok(existingAddress);
            }
            return NotFound("Address not found");

        }

        //Delete a address
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteAddress([FromRoute] int id)
        {
            var existingAddress = await dataContext.Addresses.FirstOrDefaultAsync(x => x.AddressId == id);
            if (existingAddress != null)
            {
                dataContext.Remove(existingAddress);
                await dataContext.SaveChangesAsync();
                return Ok(existingAddress);
            }
            return NotFound("Address not found");
        }
    }
}
