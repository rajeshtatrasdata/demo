// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// import { AuthenticationService } from '../_services/index';

// @Component({
//     moduleId: module.id,
//     templateUrl: 'login.component.html'
// })

// export class LoginComponent implements OnInit {
//     model: any = {};
//     loading = false;
//     error = '';
    

//     constructor(
//         private router: Router,
//         private authenticationService: AuthenticationService) { }

//     ngOnInit() {
//         // reset login status
//         this.authenticationService.logout();
//     }

//     login() {
//         this.loading = true;
//         this.authenticationService.login(this.model.email, this.model.password)
//             .subscribe(result => {    
//                 console.log(result);     
//                 if (true === result ) {
//                     this.router.navigate(['/']);
//                 } else {
//                     this.error = 'Email or password is incorrect';
//                     this.loading = false;
//                 }
//             });
//     }
// }


import {Component, OnInit, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
   
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
   private _invalidCredential:boolean=false;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _zone:NgZone) { }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this._authenticationService.login({username:this.model.email, password:this.model.password})
            .subscribe(
                data => {

                    let username = data.user.username;
                    let token = data.user.token;

                    if(username && token){
                        localStorage.setItem('currentUser', JSON.stringify(username));
                        localStorage.setItem('token','Bearer '+token);
                        this._router.navigate(["/"]).then(()=>{
                            // do whatever you need after navigation succeeds
                        });

                       // this._zone.run(() => this._router.navigate(['/']));

                    }else{
                        this._zone.run(() => this._router.navigate(['/login']));
                    }



                },
                error => {

                    this.loading = false;
                    this._invalidCredential = true;
                });
    }


}