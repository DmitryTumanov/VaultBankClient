import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";

@Injectable()
export class StorageService{
    constructor(){}

    public set(name:string, value:string) {
        localStorage.setItem(name, value);
    }

    public get(name:string):string {
        const result = localStorage.getItem(name);
        if(isNullOrUndefined(result)){
            return "";
        }
        return result;
    }

}