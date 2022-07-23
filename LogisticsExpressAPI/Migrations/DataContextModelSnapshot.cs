﻿// <auto-generated />
using System;
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LogisticsExpressAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("LogisticsExpressAPI.Models.Address", b =>
                {
                    b.Property<int>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("StreetName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("int");

                    b.Property<int>("SuburbId")
                        .HasColumnType("int");

                    b.HasKey("AddressId");

                    b.HasIndex("SuburbId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.City", b =>
                {
                    b.Property<int>("CityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ProvinceId")
                        .HasColumnType("int");

                    b.HasKey("CityId");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Country", b =>
                {
                    b.Property<int>("CountryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("CountryId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("BusinessName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("CustomerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.CustomerContact", b =>
                {
                    b.Property<int>("CustomerContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("CustomerContactId");

                    b.HasIndex("CustomerId");

                    b.ToTable("CustomerContacts");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.DriverDetail", b =>
                {
                    b.Property<int>("DriverDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("LicenseCode")
                        .HasColumnType("longtext");

                    b.Property<string>("LicenseCodeDescription")
                        .HasColumnType("longtext");

                    b.Property<string>("LicenseCopy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LicenseExpiryDate")
                        .HasColumnType("longtext");

                    b.Property<string>("LicenseNumber")
                        .HasColumnType("longtext");

                    b.HasKey("DriverDetailId");

                    b.HasIndex("EmployeeId")
                        .IsUnique();

                    b.ToTable("DriverDetails");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("EmployeeRoleId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("EmployeeId");

                    b.HasIndex("EmployeeRoleId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.EmployeeRole", b =>
                {
                    b.Property<int>("EmployeeRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EmployeeRoleDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("EmployeeRoleId");

                    b.ToTable("EmployeeRoles");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.FuelLog", b =>
                {
                    b.Property<int>("FuelEntryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Litres")
                        .HasColumnType("decimal(65,30)");

                    b.Property<DateTime>("Log_Date")
                        .HasColumnType("datetime(6)");

                    b.Property<decimal>("Price_Per_Litre")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("ReceiptImage")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Total_Spent")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("FuelEntryId");

                    b.HasIndex("VehicleId");

                    b.ToTable("FuelLogs");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.InsurancePlan", b =>
                {
                    b.Property<int>("InsurancePlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Cost")
                        .HasColumnType("double");

                    b.Property<DateTime>("DateOfIssue")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Provider")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("InsurancePlanId");

                    b.ToTable("InsurancePlans");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Province", b =>
                {
                    b.Property<int>("ProvinceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CountryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ProvinceId");

                    b.HasIndex("CountryId");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Quote", b =>
                {
                    b.Property<int>("QuoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("DropOffAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PickUpAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Quote_Date")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.HasKey("QuoteId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Quotes");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Repair", b =>
                {
                    b.Property<int>("RepairId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Cost")
                        .HasColumnType("double");

                    b.Property<DateTime>("DateCompleted")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MechanicContact")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MechanicName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("RepairId");

                    b.ToTable("Repairs");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.RepairRequests", b =>
                {
                    b.Property<int>("RepairRequestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("VehicleId")
                        .HasColumnType("int");

                    b.HasKey("RepairRequestId");

                    b.HasIndex("VehicleId");

                    b.ToTable("RepairRequests");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.ServicePlan", b =>
                {
                    b.Property<int>("ServicePlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ServicePlanDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("ServicePlanId");

                    b.ToTable("ServicePlans");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Subcontractor", b =>
                {
                    b.Property<int>("SubcontractorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("SubcontractorName")
                        .HasColumnType("longtext");

                    b.HasKey("SubcontractorId");

                    b.ToTable("Subcontractor");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.SubcontractorContacts", b =>
                {
                    b.Property<int>("SubcontractorContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<int>("SubcontractorId")
                        .HasColumnType("int");

                    b.Property<string>("SubcontractorName")
                        .HasColumnType("longtext");

                    b.HasKey("SubcontractorContactId");

                    b.HasIndex("SubcontractorId");

                    b.ToTable("SubcontractorContacts");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Suburb", b =>
                {
                    b.Property<int>("SuburbId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("SuburbId");

                    b.HasIndex("CityId");

                    b.ToTable("Suburbs");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Vehicle", b =>
                {
                    b.Property<int>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("TareWeight")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("VehicleMakeID")
                        .HasColumnType("int");

                    b.Property<int>("VehicleModelID")
                        .HasColumnType("int");

                    b.Property<int>("VehicleTypeID")
                        .HasColumnType("int");

                    b.HasKey("VehicleId");

                    b.HasIndex("VehicleMakeID");

                    b.HasIndex("VehicleModelID");

                    b.HasIndex("VehicleTypeID");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.VehicleLicense", b =>
                {
                    b.Property<int>("VehicleLicenseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EngineNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VehicleIdentificationNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VehicleLicenseId");

                    b.ToTable("VehicleLicenses");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.VehicleMake", b =>
                {
                    b.Property<int>("VehicleMakeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VehicleMakeID");

                    b.ToTable("VehicleMakes");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.VehicleModel", b =>
                {
                    b.Property<int>("VehicleModelID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VehicleModelID");

                    b.ToTable("VehicleModels");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.VehicleType", b =>
                {
                    b.Property<int>("VehicleTypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VehicleTypeID");

                    b.ToTable("VehicleTypes");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Address", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Suburb", "Suburb")
                        .WithMany()
                        .HasForeignKey("SuburbId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Suburb");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.City", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Province");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.CustomerContact", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.DriverDetail", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Employee", "Employee")
                        .WithOne("DriverDetail")
                        .HasForeignKey("LogisticsExpressAPI.Models.DriverDetail", "EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Employee", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.EmployeeRole", "EmployeeRole")
                        .WithMany()
                        .HasForeignKey("EmployeeRoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployeeRole");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.FuelLog", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Province", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Country");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Quote", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.RepairRequests", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.SubcontractorContacts", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Subcontractor", "Subcontractor")
                        .WithMany()
                        .HasForeignKey("SubcontractorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Subcontractor");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Suburb", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Vehicle", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.VehicleMake", "VehicleMake")
                        .WithMany()
                        .HasForeignKey("VehicleMakeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LogisticsExpressAPI.Models.VehicleModel", "VehicleModel")
                        .WithMany()
                        .HasForeignKey("VehicleModelID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LogisticsExpressAPI.Models.VehicleType", "VehicleType")
                        .WithMany()
                        .HasForeignKey("VehicleTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VehicleMake");

                    b.Navigation("VehicleModel");

                    b.Navigation("VehicleType");
                });

            modelBuilder.Entity("LogisticsExpressAPI.Models.Employee", b =>
                {
                    b.Navigation("DriverDetail");
                });
#pragma warning restore 612, 618
        }
    }
}
