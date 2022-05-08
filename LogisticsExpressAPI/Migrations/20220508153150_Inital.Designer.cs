﻿// <auto-generated />
using LogisticsExpressAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LogisticsExpressAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220508153150_Inital")]
    partial class Inital
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("LogisticsExpressAPI.Models.Province", b =>
                {
                    b.HasOne("LogisticsExpressAPI.Models.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Country");
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
#pragma warning restore 612, 618
        }
    }
}
