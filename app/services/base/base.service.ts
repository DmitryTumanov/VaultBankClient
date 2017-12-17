import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {StorageService} from "../storage/storage.service";
import {SettingsProvider} from "../../providers/settings/settings.provider";
import {PreLoaderProvider} from "../../providers/preloader/pre-loader.provider";
import {Router} from "@angular/router";

@Injectable()
export class BaseService {

    constructor(public http: Http,
                public storage: StorageService,
                public settings: SettingsProvider,
                public pre_loader: PreLoaderProvider,
                private router: Router,) {
    }

    public get(url: string): Observable<any> {
        return this.http.get(url).map(this.map).catch(error => this.catch(error, this.pre_loader, this.router))
    }

    public post(url: string, body: any): Observable<any> {
        return this.http.post(url, body).map(this.map).catch(error => this.catch(error, this.pre_loader, this.router))
    }

    public getAuthorized(url: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map(this.map).catch(error => this.catch(error, this.pre_loader, this.router))
    }

    public postAuthorized(url: string, body: any): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, body, options).map(this.map).catch(error => this.catch(error, this.pre_loader, this.router))
    }

    public deleteAuthorized(url: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.storage.get(this.settings.tokenKey));
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options).map(this.map).catch(error => this.catch(error, this.pre_loader, this.router))
    }

    private map(res: any): any {
        return res.json();
    }

    private catch(error: any, pre_loader: any, router: any): any {
        pre_loader.stop();
        Observable.throw(error.json().error || 'Server error');
        return router.navigateByUrl("/");
    }
}