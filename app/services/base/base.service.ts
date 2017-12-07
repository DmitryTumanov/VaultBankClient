import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {StorageService} from "../storage/storage.service";
import {SettingsProvider} from "../../providers/settings/settings.provider";

@Injectable()
export class BaseService {

    constructor(public http: Http,
                public storage: StorageService,
                public settings: SettingsProvider) {
    }

    public get(url: string): Observable<any> {
        return this.http.get(url).map(this.map).catch(this.catch)
    }

    public post(url: string, body: any): Observable<any> {
        return this.http.post(url, body).map(this.map).catch(this.catch)
    }

    public getAuthorized(url: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map(this.map).catch(this.catch)
    }

    public postAuthorized(url: string, body: any): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, body, options).map(this.map).catch(this.catch)
    }

    public deleteAuthorized(url: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options).map(this.map).catch(this.catch)
    }

    private map(res: any): any {
        return res.json();
    }

    private catch(error: any): any {
        return Observable.throw(error.json().error || 'Server error');
    }
}