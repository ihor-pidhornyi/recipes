import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import { Subject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() darkMode: boolean | undefined
  @Output() modeChanged = new Subject<boolean>();

  public onModeChange({ checked }: MatSlideToggleChange) {
    this.modeChanged.next(checked);
  }
}
