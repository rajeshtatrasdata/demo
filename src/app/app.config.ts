/**
 * Created by d-14 on 22/8/17.
 */
import { InjectionToken} from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;    
}

export const AppConfig: IAppConfig = {
    apiEndpoint: "http://localhost/Talbert/backend/web"
};