import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  private _email:String;
    private _forgotError:boolean = false;
    private _errorMsg:string;
    private _success:boolean=false;
    private _successMsg:string;
    public loading = false;
  constructor(private _authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(formValue: any){
      this.loading = true;
    this._email = formValue.email;

    this._authenticationService.forgot({email:this._email})
        .subscribe(
            data => {
            this.loading = false;
           this._success= true;
            this._successMsg = "An Email has been sent to your Email address";



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
