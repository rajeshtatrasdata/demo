import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, RoutesRecognized, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit{
    title = 'app';
    private _currentUrl:string;

    constructor(private _router:Router,private _route:ActivatedRoute){

    }

    ngOnInit():void {

        this._router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this._route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
               this._currentUrl = currentRoute.snapshot.data['name'];
                //console.log(this._currentUrl);
                let user = localStorage.getItem('currentUser');
                if(!user && this._currentUrl != "reset" && this._currentUrl != "forgot"){
                     this._router.navigate(['/login']);
                }

            })






    }
}
