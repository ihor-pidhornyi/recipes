import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public navLinks: Array<{ path: string; label: string }> = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.routeConfig) {
      this.navLinks =
        this.route.routeConfig.children
          ?.filter(this.isRouteWithLabel)
          ?.map((childRoute) => {
            return {
              path: childRoute.path ?? '',
              label: childRoute.data.label,
            };
          }) ?? [];
    }
  }

  private isRouteWithLabel(
    route: Route
  ): route is Route & { data: { label: string } } {
    return !!route.path && !!route.data && 'label' in route.data;
  }
}
