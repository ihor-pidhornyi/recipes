import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  public success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar', 2000)
  }

  public error(message: string) {
    this.openSnackBar(message, '', 'error-snackbar', 3000)
  }

  private openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 1000
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
      horizontalPosition: 'end'
    });
  }
}
