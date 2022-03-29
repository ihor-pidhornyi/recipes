import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from '../shared/components/shopping-list-edit/shopping-list-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingEditModalComponent } from './components/shopping-edit-modal/shopping-edit-modal.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    ShoppingEditModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    ShoppingRoutingModule,
  ],
})
export class ShoppingModule {}
