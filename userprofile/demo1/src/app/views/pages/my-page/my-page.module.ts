// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../../partials/partials.module';
// Pages
import { CoreModule } from '../../../core/core.module';
import { MyPageComponent } from './my-page.component';
import { RouterModule } from '@angular/router';
// import {DashboardModule} from './dashboard/dashboard.module'
const routes = [{
    path: '',
    component: MyPageComponent
}]
@NgModule({
    declarations: [MyPageComponent],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        PartialsModule,
        // DashboardModule
    ],
    providers: []
})
export class MyPageModule {
}
