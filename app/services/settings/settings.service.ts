import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SettingsService {
    private settings: any;

    constructor(private http: Http) {
    }

    public getSettings() {
        return this.settings;
    }

    public getPromise() {
        return new Promise((resolve, reject) => {
            this.http.get('../src/config/settings.json').map(res => res.json()).catch((error: any): any => {
                console.log('Settings file could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((response) => {
                this.settings = response;
                resolve(true);
            })
        });
    }
}