using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LogisticsExpressAPI.Migrations
{
    public partial class Vehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Emp_Contact",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "Emp_PhoneNumber",
                table: "Employees",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "Emp_LastName",
                table: "Employees",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "Emp_FirstName",
                table: "Employees",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Emp_Email",
                table: "Employees",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "EmployeeDescription",
                table: "EmployeeRoles",
                newName: "EmployeeRoleDescription");

            migrationBuilder.CreateTable(
                name: "DriverDetails",
                columns: table => new
                {
                    DriverDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LicenseNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseCopy = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseExpiryDate = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseCodeDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverDetails", x => x.DriverDetailId);
                    table.ForeignKey(
                        name: "FK_DriverDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InsurancePlans",
                columns: table => new
                {
                    InsurancePlanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Provider = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateOfIssue = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Cost = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsurancePlans", x => x.InsurancePlanId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Repairs",
                columns: table => new
                {
                    RepairId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DateCompleted = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cost = table.Column<double>(type: "double", nullable: false),
                    MechanicName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MechanicContact = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repairs", x => x.RepairId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ServicePlans",
                columns: table => new
                {
                    ServicePlanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ServicePlanDescription = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicePlans", x => x.ServicePlanId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "VehicleLicenses",
                columns: table => new
                {
                    VehicleLicenseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    VehicleIdentificationNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EngineNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleLicenses", x => x.VehicleLicenseId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DriverDetails_EmployeeId",
                table: "DriverDetails",
                column: "EmployeeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DriverDetails");

            migrationBuilder.DropTable(
                name: "InsurancePlans");

            migrationBuilder.DropTable(
                name: "Repairs");

            migrationBuilder.DropTable(
                name: "ServicePlans");

            migrationBuilder.DropTable(
                name: "VehicleLicenses");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Employees",
                newName: "Emp_PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Employees",
                newName: "Emp_LastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Employees",
                newName: "Emp_FirstName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Employees",
                newName: "Emp_Email");

            migrationBuilder.RenameColumn(
                name: "EmployeeRoleDescription",
                table: "EmployeeRoles",
                newName: "EmployeeDescription");

            migrationBuilder.AddColumn<string>(
                name: "Emp_Contact",
                table: "Employees",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
