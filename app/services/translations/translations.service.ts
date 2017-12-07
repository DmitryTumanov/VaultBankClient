import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TranslationsService {
    private translations: any;

    constructor(private http: Http) {
    }

    public getTranslations() {
        return this.translations;
    }

    public getPromise() {
        return new Promise((resolve, reject) => {
            this.http.get('../src/config/translations.json').map(res => res.json()).catch((error: any): any => {
                console.log('Translations file could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((response) => {
                this.translations = response;
                resolve(true);
            })
        });
    }
}