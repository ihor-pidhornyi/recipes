import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecipesRoutingModule} from './recipes-routing.module';
import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from "./components/recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./components/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {
}
