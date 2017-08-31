import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import {APP_CONFIG, IAppConfig} from "../app.config";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  userForm : any;

  constructor( private http: Http, @Inject(APP_CONFIG) private config: IAppConfig ) { }

  private userUrl = '/app_dev.php/api/user/addUser'; 

  saveUserData(body: Object) {
   // this.userForm.disable();   
    console.log(body);   
    let headers = new Headers({ 'Content-Type': 'application/json' });      
    let options = new RequestOptions({ headers: headers });     

     return this.http.post(this.config.apiEndpoint+this.userUrl, body, options ) // ...using post request
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data    
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
     
  
  }
  

}

