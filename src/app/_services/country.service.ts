import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryService {

  constructor( private http: Http, @Inject(APP_CONFIG) private config: IAppConfig ) { }
  
  private countryUrl: string = "/api/country/getCountryList";
  
  countryList() {
    // this.userForm.disable();   
    return this.http.get(this.config.apiEndpoint+this.countryUrl).map((res => res.json()));      
   
   }

}
