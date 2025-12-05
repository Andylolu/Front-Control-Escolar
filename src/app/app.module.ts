import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';

//Layouts
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnoComponent } from './partials/registro-alumnos/registro-alumnos.component';
import { RegistroMaestroComponent } from './partials/registro-maestros/registro-maestros.component';

//Angular material
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
//Ngx-cookie-service
import { CookieService } from 'ngx-cookie-service';

// Third Party Modules
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroUsuariosScreenComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    RegistroAdminComponent,
    RegistroAlumnoComponent,
    RegistroMaestroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatCheckboxModule,   
    NgxMaskDirective
    
  ],
  providers: [
    CookieService,
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
