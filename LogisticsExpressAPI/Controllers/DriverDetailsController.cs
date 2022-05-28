using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace LogisticsExpressAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DriverDetailsController : ControllerBase
    {
        private readonly DataContext dataContext;

        public DriverDetailsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all details
        [HttpGet]
        public async Task<IActionResult> getAllDriverDetails()
        {
            var driverDetails = await dataContext.DriverDetails.ToListAsync();
            return Ok(driverDetails);
        }

        //Get single detail
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("getDriverDetail")]
        public async Task<IActionResult> getDriverDetail([FromRoute] int id)
        {
            var driverDetail = await dataContext.DriverDetails.FirstOrDefaultAsync(x => x.DriverDetailId == id);
            if (driverDetail != null)
            {
                return Ok(driverDetail);
            }
            return NotFound("Details not found");
        }

        //Add details

        [HttpPost]
        public async Task<IActionResult> addDriverDetails([FromBody] DriverDetail driverDetail)
        {
            dataContext.DriverDetails.Add(driverDetail);
            await dataContext.SaveChangesAsync();
            return CreatedAtAction("getDriverDetail", new { id = driverDetail.DriverDetailId },driverDetail);
        }

        //Update details
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> updateDriverDetails([FromRoute] int id, [FromBody] DriverDetail driverDetail)
        {
            var existingDetail = await dataContext.DriverDetails.FirstOrDefaultAsync(x => x.DriverDetailId == id);
            if (existingDetail != null)
            {
                existingDetail.LicenseNumber = driverDetail.LicenseNumber;
                existingDetail.LicenseCopy = driverDetail.LicenseCopy;
                existingDetail.LicenseExpiryDate = driverDetail.LicenseExpiryDate;
                existingDetail.LicenseCode = driverDetail.LicenseCode;
                existingDetail.LicenseCodeDescription = driverDetail.LicenseCodeDescription;
                await dataContext.SaveChangesAsync();
                return Ok(existingDetail);
            }
            return NotFound("Details not found");

        }

        //Delete details
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> deleteDriverDetails([FromRoute] int id)
        {
            var existingDetail = await dataContext.DriverDetails.FirstOrDefaultAsync(x => x.DriverDetailId == id);
            if (existingDetail != null)
            {
                dataContext.Remove(existingDetail);
                await dataContext.SaveChangesAsync();
                return Ok(existingDetail);
            }
            return NotFound("Details not found");
        }
    }





}
