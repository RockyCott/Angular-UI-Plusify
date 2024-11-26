import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "datetimepicker",
    loadComponent: () =>
      import("./demo-datetime/demo-datetime.component").then(
        (m) => m.DemoDatetimeComponent,
      ),
  },
  {
    path: "timepicker",
    loadComponent: () =>
      import("./demo-time/demo-time.component").then(
        (m) => m.DemoTimeComponent,
      ),
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];
