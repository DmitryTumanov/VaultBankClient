import {Injectable} from "@angular/core";
import {BaseSettingsProvider} from "./base.settings.provider";

@Injectable()
export class SettingsProvider extends BaseSettingsProvider{
    get defaultLanguage(){ return this.get("defaultLanguage");}
    get tokenKey(){ return this.get("tokenKey");}
    get userKey(){ return this.get("userKey");}
    get languageKey(){ return this.get("languageKey");}
    get cardTypes(){ return this.get("cardTypes");}
    get taskTypes(){ return this.get("taskTypes");}
    get menuStateKey(){ return this.get("menuStateKey");}
    get itemPauseImage(){ return this.get("itemPauseImage");}
    get itemPlayImage(){ return this.get("itemPlayImage");}
    get defaultImage(){ return this.get("defaultImage");}
    get loaderImage(){ return this.get("loaderImage");}
    get mainIcon(){ return this.get("mainIcon");}
    get mainLogo(){ return this.get("mainLogo");}
    get cardsPath(){ return this.get("paths")["mainPath"]+this.get("paths")["cardsPath"];}
    get cardAddPath(){ return this.get("paths")["mainPath"]+this.get("paths")["cardAddPath"];}
    get tasksPath(){ return this.get("paths")["mainPath"]+this.get("paths")["tasksPath"];}
    get taskAddPath(){ return this.get("paths")["mainPath"]+this.get("paths")["taskAddPath"];}
    get transactionsPath(){ return this.get("paths")["mainPath"]+this.get("paths")["transactionsPath"];}
    get transactionsGetByCardPath(){ return this.get("paths")["mainPath"]+this.get("paths")["transactionsGetByCardPath"];}
    get transactionsGetByTaskPath(){ return this.get("paths")["mainPath"]+this.get("paths")["transactionsGetByTaskPath"];}
    get cardRemovePath(){ return this.get("paths")["mainPath"]+this.get("paths")["cardRemovePath"];}
    get authorizationPath(){ return this.get("paths")["mainPath"]+this.get("paths")["authorizationPrefix"];}
    get authorizationSecondStep(){ return this.get("paths")["mainPath"]+this.get("paths")["authorizationSecondStep"];}
    get authorizationThirdStep(){ return this.get("paths")["mainPath"]+this.get("paths")["authorizationThirdStep"];}
    get authorizationKeyStep(){ return this.get("paths")["mainPath"]+this.get("paths")["authorizationKeyStep"];}
}