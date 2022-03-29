import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [HeaderComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
