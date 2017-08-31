import { Component, OnInit } from '@angular/core';
import { VeneerService } from '../veneer.service';

@Component({
  selector: 'app-veneer',
  templateUrl: './veneer.component.html',
  styleUrls: ['./veneer.component.scss']
})
export class VeneerComponent implements OnInit {

 private datas = [];
 showHide: boolean = false;

 constructor( private veneerservice: VeneerService ) { }
   
  onSelectionChange(val) {  
        if(val == 0){
          this.showHide = true; 
        }else{
          this.showHide = false; 
        }
    }

  ngOnInit() {     
     this.veneerservice.editEstimateData().subscribe((Response) => this.datas = Response);
  }

}
