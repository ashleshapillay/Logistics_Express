using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using LogisticsExpressAPI.Models;

namespace LogisticsExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext dataContext;

        public EmployeeController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        //Get all employees
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await dataContext.Employees.ToListAsync();
            return Ok(employees);
        }

        //Get single employee
        [HttpGet]
        [Route("{id:int}")]
        [ActionName("GetEmployee")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            var employee = await dataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (employee != null)
            {
                return Ok(employee);
            }
            return NotFound("Employee not found");
        }

        //Add a employee
        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            dataContext.Employees.Add(employee);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeRoleId }, employee);

        }

        //Update a employee
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            var existingEmployee = await dataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (existingEmployee != null)
            {
                existingEmployee.Emp_PhoneNumber = employee.Emp_PhoneNumber;
                existingEmployee.Emp_Email = employee.Emp_Email;
                existingEmployee.Emp_Contact = employee.Emp_Contact;
                existingEmployee.EmployeeRoleId = employee.EmployeeRoleId;
                existingEmployee.Emp_FirstName = employee.Emp_FirstName;
                existingEmployee.Emp_LastName = employee.Emp_LastName;
                await dataContext.SaveChangesAsync();
                return Ok(existingEmployee);
            }
            return NotFound("Employee not found");

        }

        //Delete a employee
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var existingEmployee = await dataContext.Employees.FirstOrDefaultAsync(x => x.EmployeeId == id);
            if (existingEmployee != null)
            {
                dataContext.Remove(existingEmployee);
                await dataContext.SaveChangesAsync();
                return Ok(existingEmployee);
            }
            return NotFound("Employee not found");
        }
    }
}
