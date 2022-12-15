import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoCreateComponent } from './pages/todo-create/todo-create.component';
import { AuthGuardService } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'todos',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: TodoListComponent,
          },
          {
            path: 'create',
            component: TodoCreateComponent,
          },
          {
            path: ':id',
            component: TodoCreateComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
