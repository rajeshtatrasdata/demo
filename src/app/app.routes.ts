import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { UserComponent } from './user/user.component';

import {ForgotComponent} from './forgot/forgot.component';
import {ResetComponent} from "./reset/reset.component";


export const appRoutes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full'},
    // { path: 'login', component: LoginComponent },
    // { path: '**',  component: LoginComponent}
    { path: '', component: HomeComponent},
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotComponent,data:{
        name:"forgot"
    } },
    { path: 'reset', component: ResetComponent ,data:{
        name:"reset"
    }},
    { path: '**',  redirectTo: '', pathMatch: 'full' }
];
