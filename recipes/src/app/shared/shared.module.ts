import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { EditIngredientComponent } from './components/shopping-list-edit/edit-ingredient.component';

const AngularModules = [CommonModule, ReactiveFormsModule, RouterModule];

const MaterialModules = [
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationModalComponent,
    EditIngredientComponent,
  ],
  imports: [...AngularModules, ...MaterialModules],
  exports: [
    HeaderComponent,
    EditIngredientComponent,
    ConfirmationModalComponent,
  ],
})
export class SharedModule {}
