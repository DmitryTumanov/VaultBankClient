import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class PreLoaderProvider {
    public emitter = new EventEmitter();

    public start(){
        this.emitter.emit(true);
    }

    public stop(){
        this.emitter.emit(false);
    }
}