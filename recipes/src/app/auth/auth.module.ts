import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';

const AngularModules = [CommonModule, ReactiveFormsModule];
const MaterialModules = [
  MatTabsModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    ...AngularModules,
    ...MaterialModules,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
