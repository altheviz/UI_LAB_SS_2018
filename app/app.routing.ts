import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { CacheComponent } from "./pages/settings/cache.component";
import { RepolistComponent } from "./pages/repolist/repolist.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "cache", component: CacheComponent },
  { path: "repolist/:id", component: RepolistComponent },
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  CacheComponent,
  RepolistComponent
];
