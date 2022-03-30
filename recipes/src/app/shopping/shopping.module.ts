import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditModalComponent } from './components/shopping-edit-modal/shopping-edit-modal.component';

const AngularModules = [
  CommonModule,
  ReactiveFormsModule,
]

const MaterialModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
]

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingEditModalComponent,
  ],
  imports: [
    ...AngularModules,
    ...MaterialModules,
    SharedModule,
    ShoppingRoutingModule,
  ],
})
export class ShoppingModule {}
