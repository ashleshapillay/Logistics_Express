using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;
namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dataContext;

        public CityController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all cities
        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            var cities = await dataContext.Cities.ToListAsync();
            return Ok(cities);
        }

        //Get single city
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetCity")]
        public async Task<IActionResult> GetCity([FromRoute] int id)
        {
            var city = await dataContext.Cities.FirstOrDefaultAsync(x => x.CityId == id);
            if (city != null)
            {
                return Ok(city);
            }
            return NotFound("City not found");
        }

        //Add a city
        [HttpPost]
        public async Task<IActionResult> AddCity(City city)
        {
            dataContext.Cities.Add(city);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetCity", new { id = city.ProvinceId }, city);
        }

        //Update a city
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateCity([FromRoute] int id, [FromBody] City city)
        {
            var existingCity = await dataContext.Cities.FirstOrDefaultAsync(x => x.CityId == id);
            if (existingCity != null)
            {
                existingCity.Name = city.Name;
                existingCity.ProvinceId = city.ProvinceId;
                await dataContext.SaveChangesAsync();
                return Ok(existingCity);
            }
            return NotFound("City not found");

        }

        //Delete a city
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteCity([FromRoute] int id)
        {
            var existingCity = await dataContext.Cities.FirstOrDefaultAsync(x => x.CityId == id);
            if (existingCity != null)
            {
                dataContext.Remove(existingCity);
                await dataContext.SaveChangesAsync();
                return Ok(existingCity);
            }
            return NotFound("City not found");
        }
    }
}
