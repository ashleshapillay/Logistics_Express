using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LocationAPI.Data;
using Microsoft.EntityFrameworkCore;
using LocationAPI.Models;

namespace LocationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly DataContext dataContext;

        public CountryController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all countries
        [HttpGet]
        public async Task<IActionResult> GetAllCountries()
        {
            var countries = await dataContext.Countries.ToListAsync();
            return Ok(countries);
        }

        //Get single country
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetCountry")]
        public async Task<IActionResult> GetCountry([FromRoute] int id)
        {
            var country = await dataContext.Countries.FirstOrDefaultAsync(x => x.CountryId == id);
            if(country != null)
            {
                return Ok(country);
            }
            return NotFound("Country not found");
        }
        
        //Add a country
        [HttpPost]
        public async Task<IActionResult> AddCountry([FromBody] Country country)
        {
            var newCountry= new Country
            {
                Name = country.Name
            };
            dataContext.Countries.Add(newCountry);
            await dataContext.SaveChangesAsync();
            return await GetCountry(newCountry.CountryId);
        }

        //Update a country
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateCountry([FromRoute] int id, [FromBody] Country country)
        {
            var existingCountry = await dataContext.Countries.FirstOrDefaultAsync(x => x.CountryId == id);
            if (existingCountry != null)
            {
                existingCountry.Name = country.Name;
                await dataContext.SaveChangesAsync();
                return Ok(existingCountry);
            }
            return NotFound("Country not found");

        }

        //Delete a country
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteCountry([FromRoute] int id)
        {
            var existingCountry = await dataContext.Countries.FirstOrDefaultAsync(x => x.CountryId == id);
            if (existingCountry != null)
            {
                dataContext.Remove(existingCountry);
                await dataContext.SaveChangesAsync();
                return Ok(existingCountry);
            }
            return NotFound("Country not found");
        }


    }
}
