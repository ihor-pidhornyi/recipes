import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public isDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading = false;
  private onDestroy$ = new Subject<void>();
  private materialTypographyClass = 'mat-typography';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    const darkModeValue = localStorage.getItem('darkMode');
    let isDarkMode = darkModeValue === 'true';

    if (darkModeValue === null && this.matchesDarkTheme()) {
      isDarkMode = true;
    }

    this.setDarkMode(isDarkMode);

    this.isDarkMode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isDarkMode) => {
        this.setBodyClass(isDarkMode);
      });

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onModeChanged(isDarkMode: boolean): void {
    this.setDarkMode(isDarkMode);
  }

  private setDarkMode(darkMode: boolean) {
    this.isDarkMode$.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }

  private setBodyClass(isDark: boolean): void {
    const hostClass = isDark ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(
      this.document.body,
      'class',
      `${this.materialTypographyClass} ${hostClass}`
    );
  }

  private matchesDarkTheme(): boolean {
    return !!this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: dark)'
    )?.matches;
  }
}
