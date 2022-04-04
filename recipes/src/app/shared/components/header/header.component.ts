import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() darkMode: boolean | undefined;
  @Output() modeChanged = new Subject<boolean>();

  public isHandset$: Observable<boolean> | undefined;
  public isOpened$ = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .pipe(map((state) => state.matches));
  }

  public onModeChange({ checked }: MatSlideToggleChange) {
    this.modeChanged.next(checked);
  }

  public toggleNavigation() {
    this.isOpened$.next(!this.isOpened$.value);
  }

  public closeNavAfterAction() {
    this.isOpened$.next(false);
  }
}
