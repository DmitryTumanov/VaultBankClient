import 'materialize-css';
import 'jquery';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {environment} from './environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {AppComponent} from './components/app/app.component';
import {HomeComponent} from './components/home/home.component';
import {NavComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {CardsComponent} from './components/cards/cards.component';
import {NewCardComponent} from './components/new-card/new-card.component';
import {MaterializeModule} from "angular2-materialize";
import {CardsProvider} from "./providers/cards/cards.provider";
import {CardsService} from "./services/cards/cards.service";
import {TasksService} from "./services/tasks/tasks.service";
import {TasksComponent} from "./components/tasks/tasks.component";
import {TasksProvider} from "./providers/tasks/tasks.provider";
import {TranslationsService} from "./services/translations/translations.service";
import {TranslationsProvider} from "./providers/translations/translations.provider";
import {SettingsService} from "./services/settings/settings.service";
import {AppInitializer} from "./initializers/app.initializer";
import {SettingsProvider} from "./providers/settings/settings.provider";
import {BaseComponent} from "./components/base/base.component";
import {StorageService} from "./services/storage/storage.service";
import {BaseTranslationsProvider} from "./providers/translations/base.translations.provider";
import {BaseSettingsProvider} from "./providers/settings/base.settings.provider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreditCardFormValidator} from "./validators/credit-card-form.validator";
import {ValidatorsProvider} from "./providers/validators/validators.provider";
import {CustomFormsModule} from "ng2-validation";
import {CardTypesComponent} from "./components/card-types/card-types.component";
import {CardItemComponent} from "./components/cards/card-item.component";
import {LoginFirstStepComponent} from "./components/login/login-first-step.component";
import {AuthorizationService} from "./services/authorization/authorization.service";
import {AuthorizationProvider} from "./providers/authorization/authorization.provider";
import {LoginSecondStepComponent} from "./components/login/login-second-step.component";
import {LoginThirdStepComponent} from "./components/login/login-third-step.component";
import {BaseService} from "./services/base/base.service";
import {PreLoaderComponent} from "./components/preloader/pre-loader.component";
import {PreLoaderProvider} from "./providers/preloader/pre-loader.provider";
import {CardRemoveConfirmComponent} from "./components/cards/card-remove-confirm.component";
import {LoginKeyStepComponent} from "./components/login/login-key-step.component";
import {ErrorFieldComponent} from "./components/error/error-field.component";
import {NewTaskComponent} from "./components/new-task/new-task.component";
import {CardsSelectorComponent} from "./components/cards/cards-selector.component";
import {TaskFormValidator} from "./validators/task-form.validator";
import {TaskTypesComponent} from "./components/task-types/task-types.component";
import {NewTaskStepOneComponent} from "./components/new-task/new-task-step-one.component";
import {NewTaskStepTwoComponent} from "./components/new-task/new-task-step-two.component";
import {TaskItemComponent} from "./components/tasks/task-item.component";
import {ComingSoonComponent} from "./components/coming-soon/coming-soon.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {TransactionsService} from "./services/transactions/transactions.service";
import {TransactionsProvider} from "./providers/transactions/transactions.provider";
import {TaskTypesFilterComponent} from "./components/task-types/task-types-filter.component";
import {AuthFormsValidator} from "./validators/auth-forms.validator";
import {LoginTypeComponent} from "./components/login/login-type.component";
import {CardTypesFilterComponent} from "./components/card-types/card-types-filter.component";
import {TaskSettingsComponent} from "./components/task-settings/task-settings.component";

const appRoutes: Routes = [
    {path: '', component: LoginFirstStepComponent},
    {path: 'cards', component: CardsComponent},
    {path: 'tasks', component: TasksComponent},
    {path: 'new-card', component: NewCardComponent},
    {path: 'new-task', component: NewTaskComponent},
    {path: 'login-second-step/:login', component: LoginSecondStepComponent},
    {path: 'login-third-step/:login/:email', component: LoginThirdStepComponent},
    {path: 'login-key-step/:login', component: LoginKeyStepComponent},
    {path: 'settings', component: ComingSoonComponent},
    {path: 'transactions', component: TransactionsComponent},
    {path: 'task-settings/:taskId', component: TaskSettingsComponent},
    {path: 'card-settings', component: ComingSoonComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        ),
        MaterializeModule,
        HttpModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule
    ],
    declarations: [
        AppComponent,
        BaseComponent,
        HomeComponent,
        NavComponent,
        FooterComponent,
        CardsComponent,
        TasksComponent,
        NewCardComponent,
        CardTypesComponent,
        CardItemComponent,
        LoginFirstStepComponent,
        LoginSecondStepComponent,
        LoginThirdStepComponent,
        PreLoaderComponent,
        CardRemoveConfirmComponent,
        LoginKeyStepComponent,
        ErrorFieldComponent,
        NewTaskComponent,
        CardsSelectorComponent,
        TaskTypesComponent,
        NewTaskStepOneComponent,
        NewTaskStepTwoComponent,
        TaskItemComponent,
        ComingSoonComponent,
        TransactionsComponent,
        TaskTypesFilterComponent,
        LoginTypeComponent,
        CardTypesFilterComponent,
        TaskSettingsComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AppInitializer,
        CardsProvider,
        CardsService,
        TasksProvider,
        TasksService,
        StorageService,
        BaseTranslationsProvider,
        TranslationsProvider,
        TranslationsService,
        BaseSettingsProvider,
        SettingsProvider,
        SettingsService,
        CreditCardFormValidator,
        ValidatorsProvider,
        AuthorizationService,
        AuthorizationProvider,
        BaseService,
        PreLoaderProvider,
        TaskFormValidator,
        TransactionsService,
        TransactionsProvider,
        AuthFormsValidator,
        { provide: APP_INITIALIZER, useFactory: (config: AppInitializer) => () => config.load(), deps: [AppInitializer], multi: true }
    ]
})
export class AppModule {
}