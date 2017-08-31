import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {

  veneerdatas: any;
  constructor(private _router:Router) { }

    ngOnInit():void {
        let user = localStorage.getItem('currentUser');
        if(!user){
            this._router.navigate(['/login']);
        }


    }
  ngAfterViewInit(){
      $('.nav-md .main-collapse.body .middle_col').css('visibility','visible');
//code for collapse when click on leftside arrow
      $(".sideArrow").click(function () {
          $("body").toggleClass("nav-md nav-sm");
          $('img',this).toggle();
      });
  }

  // getEstimateData() {
  //   console.log(this.veneerservice.editEstimateData());
  // }

}
