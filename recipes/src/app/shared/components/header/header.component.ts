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
import {
  animate,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: '1',
          display: 'block'
        })
      ),
      state(
        'closed',
        style({
          display: 'none',
          opacity: '0',
        })
      ),
      transition('open => closed', [sequence([
        animate('300ms ease-in-out'),
      ])]),
      transition('closed => open', [sequence([
        style({ display: 'block' }),
        animate('300ms ease-in-out')
      ])]),
    ]),
  ],
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
