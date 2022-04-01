import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
  private onDestroy$ = new Subject<void>();
  private materialTypographyClass = 'mat-typography';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
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
