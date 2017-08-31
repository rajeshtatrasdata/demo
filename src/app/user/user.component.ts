import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../_services/validation.service';
import { UserService } from '../_services/user.service';
import { CountryService } from '../_services/country.service';
declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, CountryService, ValidationService]
})
export class UserComponent implements OnInit {

  public userForm: any;
  public company: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phone: number;
  public userlogname: string;
  public status: number;
  public password: string;
  public repeatpassword: string;
  public address: string;
  public country: string;
  public state: string;
  public city: string;
  public roles: string;
  public loginval: number;
  public pwdMismatch: boolean;
  public success:string;

  countrydatas:any;

  data: any={};
  SuccessMassage = {}

  constructor(
    private userservice: UserService,
    private countryservice: CountryService,
    private validationService: ValidationService,
    private frmbuilder: FormBuilder    
  ) { }

  ngOnInit() {
    this.validateformdata();
  }

ngAfterViewInit(){
    $('.nav-md .main-collapse.body .middle_col').css('visibility','visible');
    //code for collapse when click on leftside arrow
    $(".sideArrow").click(function () {
        $("body").toggleClass("nav-md nav-sm");
        $('img',this).toggle();
    });
} 

  validateformdata() {
    
        this.userForm = this.frmbuilder.group({
          'company': ['', Validators.required],
          'firstname': ['', Validators.required],
          'lastname': ['', Validators.required],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'phone': ['', Validators.required],
          'userlogname': ['', Validators.required],
          'status': [''],
          'password': ['', Validators.required],
          'repeatpassword': ['', Validators.required],
          'address': ['', Validators.required],
          'country': ['',Validators.required],
          'state': ['',Validators.required],
          'city': ['',Validators.required],
          'roles': ['',Validators.required]
        });
    
      }

      saveUser(){   
        
        if(this.userForm.controls.status.value == ''){
          this.loginval = 0;          
        }else{
          this.loginval =this.userForm.controls.status.value;
        }

        this.pwdMismatch = !this.validationService.passwordMatch(this.userForm.value.password, this.userForm.value.repeatpassword);
        if (!this.pwdMismatch) {
        
          let body = JSON.stringify({
            company: this.userForm.controls.company.value,
            fname: this.userForm.controls.firstname.value,
            lname: this.userForm.controls.lastname.value,
            email: this.userForm.controls.email.value,
            phone: this.userForm.controls.phone.value,
            username: this.userForm.controls.userlogname.value,
            is_active: this.loginval,
            password: this.userForm.controls.password.value,
            repeatpassword: this.userForm.controls.repeatpassword.value,
            address: this.userForm.controls.address.value,
            country_id: this.userForm.controls.country.value,
            state_id: this.userForm.controls.state.value,
            city: this.userForm.controls.city.value,
            role_id: this.userForm.controls.roles.value,      
          });
  
          this.userservice.saveUserData(body).subscribe((dataResponse) => {
           //console.log("exec " + dataResponse);
            console.log(dataResponse);
            if(dataResponse.status === 1){
              this.success = dataResponse.message;
            }
            this.validateformdata();
  
          });

        }
 
      }

      getcountrydata(){
        this.countryservice.countryList()
        .subscribe(res => this.countrydatas = res);
        //.subscribe((Response) => this.countrydatas = Response);
        //this.countryservice.countryList().subscribe((Response) => console.log(this.countrydatas = Response));
        console.log(this.countrydatas);
        alert(this.countrydatas);
      }




}
