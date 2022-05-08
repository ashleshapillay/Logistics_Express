import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../modules/locationmodules/country.module';
import { Province } from '../modules/locationmodules/province.module';
import { City } from '../modules/locationmodules/city.module';
import { Suburb } from '../modules/locationmodules/suburb.module';
import { Address } from '../modules/locationmodules/address.module';

@Injectable({
  providedIn: 'root'
})
export class LocationserviceService {

//base URL's
  countryUrl = 'https://localhost:7056/api/Country';
  provinceUrl = 'https://localhost:7056/api/Province';
  cityUrl = 'https://localhost:7056/api/City';
  suburbUrl = 'https://localhost:7056/api/Suburb';
  addressUrl = 'https://localhost:7056/api/Address';

  constructor(private http: HttpClient) { }

  //COUNTRY
    //get all countries
    getAllCountries(): Observable<Country[]>{
      return  this.http.get<Country[]>(this.countryUrl)
     }
     //get a single country
     getCountry(id: Number):Observable<Country[]>{
      return this.http.get<Country[]>(this.countryUrl + '/' + id)
    }
    //add new country
    addCountry(country:Country):Observable<Country>{
      return this.http.post<Country>(this.countryUrl,country);
    }
    //update a country
    updateCountry(country: Country): Observable<Country>{
      return  this.http.put<Country>(this.countryUrl + '/'+ country.countryId, country);
    }
    //delete a country
    deleteCountry(id: Number): Observable<Country>{
      return  this.http.delete<Country>(this.countryUrl + '/'+ id);
    }


  //PROVINCE
    //get all provinces
    getAllProvinces(): Observable<Province[]>{
      return  this.http.get<Province[]>(this.provinceUrl)
     }
     //get a single province
     getProvince(id: Number):Observable<Province[]>{
      return this.http.get<Province[]>(this.provinceUrl + '/' + id)
    }
    //add new province
    addProvince(province:Province):Observable<Province>{
      return this.http.post<Province>(this.provinceUrl,province);
    }
    //update a province
    updateProvince(province: Province): Observable<Province>{
      return  this.http.put<Province>(this.provinceUrl + '/'+ province.provinceId, province);
    }
    //delete a province
    deleteProvince(id: Number): Observable<Province>{
      return  this.http.delete<Province>(this.provinceUrl + '/'+ id);
    }


  //CITY
    //get all cities
    getAllCities(): Observable<City[]>{
      return  this.http.get<City[]>(this.cityUrl)
     }
     //get a single city
     getCity(id: Number):Observable<City[]>{
      return this.http.get<City[]>(this.cityUrl + '/' + id)
    }
    //add new city
    addCity(city:City):Observable<City>{
      return this.http.post<City>(this.cityUrl,city);
    }
    //update a city
    updateCity(city: City): Observable<City>{
      return  this.http.put<City>(this.cityUrl + '/'+ city.cityId, city);
    }
    //delete a city
    deleteCity(id: Number): Observable<City>{
      return  this.http.delete<City>(this.cityUrl + '/'+ id);
    }


  //SUBURB
    //get all suburbs
    getAllSuburbs(): Observable<Suburb[]>{
      return  this.http.get<Suburb[]>(this.suburbUrl)
     }
     //get a single suburb
     getSuburb(id: Number):Observable<Suburb[]>{
      return this.http.get<Suburb[]>(this.suburbUrl + '/' + id)
    }
    //add new suburb
    addSuburb(suburb:Suburb):Observable<Suburb>{
      return this.http.post<Suburb>(this.suburbUrl,suburb);
    }
    //update a suburb
    updateSuburb(suburb: Suburb): Observable<Suburb>{
      return  this.http.put<Suburb>(this.suburbUrl + '/'+ suburb.suburbId, suburb);
    }
    //delete a suburb
    deleteSuburb(id: Number): Observable<Suburb>{
      return  this.http.delete<Suburb>(this.suburbUrl + '/'+ id);
    }


  //ADDRESS
    //get all addresses
    getAllAddresses(): Observable<Address[]>{
      return  this.http.get<Address[]>(this.addressUrl)
     }
     //get a single address
     getAddress(id: Number):Observable<Address[]>{
      return this.http.get<Address[]>(this.addressUrl + '/' + id)
    }
    //add new address
    addAddress(address:Address):Observable<Address>{
      return this.http.post<Address>(this.addressUrl,address);
    }
    //update a address
    updateAddress(address: Address): Observable<Address>{
      return  this.http.put<Address>(this.addressUrl + '/'+ address.addressId, address);
    }
    //delete a address
    deleteAddress(id: Number): Observable<Address>{
      return  this.http.delete<Address>(this.addressUrl + '/'+ id);
    }
}
