import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    private _token:string='';
    private _newPassword:string;
    private _cnPassword:string;
    private _forgotError:boolean = false;
    private _errorMsg:string;
    private _success:boolean=false;
    private _successMsg:string;
    public loading = false;

  constructor(private _activatedRoute:ActivatedRoute,private _authenticationService:AuthenticationService,private _router:Router) { }

  ngOnInit() {
      this._activatedRoute.queryParams.subscribe(
          data => {

              this._token = data['token'];
              

          });
  }

    onSubmit(formValue:any){
        this.loading = true;
        this._token = formValue.token;
        this._newPassword = formValue.newpassword;
        this._cnPassword = formValue.cnpassword;

        this._authenticationService.reset({token:this._token,newpassword:this._newPassword,cnpassword:this._cnPassword})
            .subscribe(
                data => {
                    
                    this._success= true;
                    this._successMsg = "Your password has been successfully reset";

                    setTimeout(() =>
                        {
                            this._router.navigate(['/login'])
                        },
                        2000);



                },
                error => {
                    this.loading= false;
                    let errordata = JSON.parse(error._body);

                    if(errordata.status == 0){
                        this._forgotError = true;
                        this._errorMsg = errordata.message;
                    }

                });

        

    }

}
