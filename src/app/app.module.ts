import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NpnSliderModule } from "npn-slider";
import { ChartsModule } from 'ng2-charts';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'ng4-social-login';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthInterceptorService } from './app-services/auth-service/auth-interceptor.service';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AgmDirectionModule } from 'agm-direction'; 
import { FileUploadModule } from 'ng2-file-upload';
import {AgmCoreModule} from '@agm/core';
import { SafePipeModule } from 'safe-pipe';
//Material
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
// import { NgxPayPalModule } from 'ngx-paypal';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import Swal from 'sweetalert2'; 

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('718484333750-9q51chmts2ia5l4ch8ivos3dimo3k6al.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('467160208312315')
  }
], false);
// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
// import { NgxPayPalModule } from 'ngx-paypal';

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    CustomerLayoutComponent,
    AdminLayoutComponent
            ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    SafePipeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NpnSliderModule,
    SocialLoginModule,
    Ng2SearchPipeModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjE8B7GRsFSESyCQ7fhJh5e7ZIQ2EiyM8',
      libraries: ['places']
    }),
    NgxImageZoomModule,
    AgmDirectionModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
