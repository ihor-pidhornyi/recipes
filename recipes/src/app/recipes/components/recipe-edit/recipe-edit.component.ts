import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  public id$: Observable<string> | undefined;
  public isEditMode$: Observable<boolean> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      filter((id): id is string => typeof id === 'string')
    );

    this.isEditMode$ = this.id$.pipe(startWith(false), map(Boolean));
  }
}
