// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Partials
import { PartialsModule } from '../../partials/partials.module';
// Pages
import { CoreModule } from '../../../core/core.module';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule,CanActivate } from '@angular/router';
import { MatIcon, MatAutocompleteModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, MatCardModule, MatChipsModule, MatSelectModule, MatProgressBarModule, MatProgressSpinnerModule, MatIconModule, MatSliderModule, MatPaginatorModule, MatSortModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatToolbarModule, MatDividerModule, MatTabsModule, MatTableModule, MatTooltipModule, MatListModule, MatGridListModule, MatButtonToggleModule, MatBottomSheetModule, MatExpansionModule, MatMenuModule, MatTreeModule } from '@angular/material';

import { NgbProgressbarModule, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import {AutorizationGuards} from '../../../guards/authorization.guards'
import { TokenInterceptor } from '../../../interceptor/jwt.interceptor';
import { NgxDropzoneModule } from 'ngx-dropzone';

// import {DashboardModule} from './dashboard/dashboard.module'
const routes = [{
    path: '',
    component: UserProfileComponent,
    canActivate: [AutorizationGuards]
        // NgbProgressbarModule,

}]
@NgModule({
    declarations: [UserProfileComponent],
    exports: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        CoreModule,
        PartialsModule,
        MatIconModule,
        NgbProgressbarModule,
        NgxDropzoneModule
        // DashboardModule
    ],
    providers: [AutorizationGuards]
})
export class UserProfileModule {
}
