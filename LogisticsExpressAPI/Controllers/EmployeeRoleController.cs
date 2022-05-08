using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeRoleController : ControllerBase
    {
        private readonly DataContext dataContext;

        public EmployeeRoleController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all employee roles
        [HttpGet]
        public async Task<IActionResult> GetAllEmployeeRoles()
        {
            var employeeRoles = await dataContext.EmployeeRoles.ToListAsync();
            return Ok(employeeRoles);
        }

        //Get single employee role
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetEmployeeRole")]
        public async Task<IActionResult> GetEmployeeRole([FromRoute] int id)
        {
            var employeeRole = await dataContext.EmployeeRoles.FirstOrDefaultAsync(x => x.EmployeeRoleId == id);
            if (employeeRole != null)
            {
                return Ok(employeeRole);
            }
            return NotFound("Employee role not found");
        }

        //Add a employee role
        [HttpPost]
        public async Task<IActionResult> AddEmployeeRole([FromBody] EmployeeRole employeeRole)
        {
            var newEmployeeRole = new EmployeeRole
            {
                EmployeeDescription = employeeRole.EmployeeDescription
            };
            dataContext.EmployeeRoles.Add(newEmployeeRole);
            await dataContext.SaveChangesAsync();
            return await GetEmployeeRole(newEmployeeRole.EmployeeRoleId);
        }

        //Update a employee role
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEmployeeRole([FromRoute] int id, [FromBody] EmployeeRole employeeRole)
        {
            var existingEmployeeRole = await dataContext.EmployeeRoles.FirstOrDefaultAsync(x => x.EmployeeRoleId == id);
            if (existingEmployeeRole != null)
            {
                existingEmployeeRole.EmployeeDescription = employeeRole.EmployeeDescription;
                await dataContext.SaveChangesAsync();
                return Ok(existingEmployeeRole);
            }
            return NotFound("Employee role not found");

        }

        //Delete a employee role
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployeeRole([FromRoute] int id)
        {
            var existingEmployeeRole = await dataContext.EmployeeRoles.FirstOrDefaultAsync(x => x.EmployeeRoleId == id);
            if (existingEmployeeRole != null)
            {
                dataContext.Remove(existingEmployeeRole);
                await dataContext.SaveChangesAsync();
                return Ok(existingEmployeeRole);
            }
            return NotFound("Employee role not found");
        }


    }
}
