import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-not-selected',
  templateUrl: './recipe-not-selected.component.html',
  styleUrls: ['./recipe-not-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeNotSelectedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
