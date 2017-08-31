import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class VeneerService {

  constructor(private http: Http) { }
  private _url: string = '../assets/json/veneer.json';
   public editEstimateData() {
    return this.http.get(this._url).map((res: Response) => res.json());
   }

}
