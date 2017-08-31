import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,private _router:Router) { }

  ngOnInit() {
  }

    logout(){


            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            if (localStorage.getItem("token") === null) {

                this._router.navigate(['/login']);
            }


    }


}
