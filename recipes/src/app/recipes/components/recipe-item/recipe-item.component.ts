import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
