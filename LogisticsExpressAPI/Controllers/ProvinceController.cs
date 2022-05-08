using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly DataContext dataContext;

        public ProvinceController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all provinces
        [HttpGet]
        public async Task<IActionResult> GetAllProvinces()
        {
            var provinces = await dataContext.Provinces.ToListAsync();
            return Ok(provinces);
        }

        //Get single province
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetProvince")]
        public async Task<IActionResult> GetProvince([FromRoute] int id)
        {
            var province = await dataContext.Provinces.FirstOrDefaultAsync(x => x.ProvinceId == id);
            if (province != null)
            {
                return Ok(province);
            }
            return NotFound("Province not found");
        }

        //Add a province
        [HttpPost]
        public async Task<IActionResult> AddProvince(Province province)
        {
            dataContext.Provinces.Add(province);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetProvince", new { id = province.CountryId }, province);

        }

        //Update a province
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateProvince([FromRoute] int id, [FromBody] Province province)
        {
            var existingProvince = await dataContext.Provinces.FirstOrDefaultAsync(x => x.ProvinceId == id);
            if (existingProvince != null)
            {
                existingProvince.Name = province.Name;
                existingProvince.CountryId = province.CountryId;
                await dataContext.SaveChangesAsync();
                return Ok(existingProvince);
            }
            return NotFound("Province not found");

        }

        //Delete a province
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteProvince([FromRoute] int id)
        {
            var existingProvince = await dataContext.Provinces.FirstOrDefaultAsync(x => x.ProvinceId == id);
            if (existingProvince != null)
            {
                dataContext.Remove(existingProvince);
                await dataContext.SaveChangesAsync();
                return Ok(existingProvince);
            }
            return NotFound("Province not found");
        }
    }
}
