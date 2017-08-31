import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {APP_CONFIG, IAppConfig} from "../app.config";

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,@Inject(APP_CONFIG) private config: IAppConfig) {

    }



    login(body:Object){

        body = JSON.stringify(body);

        return this.http.post(this.config.apiEndpoint+'/api/user/login', body)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

    }

   

    forgot(body:Object){

        body = JSON.stringify(body);

        return this.http.post(this.config.apiEndpoint+'/api/user/forgot', body)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

    }



    reset(body:Object){

        body = JSON.stringify(body);

        return this.http.post(this.config.apiEndpoint+'/api/user/reset', body)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable (error: Response | any) {
        
        return Observable.throw(error.message || error);
    }

}