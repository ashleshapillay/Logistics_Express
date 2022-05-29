using LogisticsExpressAPI.Data;
using LogisticsExpressAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LogisticsExpressAPI.Controllers
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
            public async Task<IActionResult> getAllRoles()
            {
                var employeeRoles = await dataContext.EmployeeRoles.ToListAsync();
                return Ok(employeeRoles);
            }

            //Get single employee role
            [HttpGet]
            [Route("{id:int}")]
            [ActionName("getRole")]
            public async Task<IActionResult> getRole([FromRoute] int id)
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
            public async Task<IActionResult> addRole([FromBody] EmployeeRole employeeRole)
            {
                var newEmployeeRole = new EmployeeRole
                {
                    EmployeeRoleDescription = employeeRole.EmployeeRoleDescription
                };
                dataContext.EmployeeRoles.Add(newEmployeeRole);
                await dataContext.SaveChangesAsync();
                return await getRole(newEmployeeRole.EmployeeRoleId);
            }

            //Update a employee role
            [HttpPut]
            [Route("{id:int}")]
            public async Task<IActionResult> updateRole([FromRoute] int id, [FromBody] EmployeeRole employeeRole)
            {
                var existingEmployeeRole = await dataContext.EmployeeRoles.FirstOrDefaultAsync(x => x.EmployeeRoleId == id);
                if (existingEmployeeRole != null)
                {
                    existingEmployeeRole.EmployeeRoleDescription = employeeRole.EmployeeRoleDescription;
                    await dataContext.SaveChangesAsync();
                    return Ok(existingEmployeeRole);
                }
                return NotFound("Employee role not found");

            }

            //Delete a employee role
            [HttpDelete]
            [Route("{id:int}")]
            public async Task<IActionResult> deleteRole([FromRoute] int id)
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


