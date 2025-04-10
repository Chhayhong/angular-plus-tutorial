import { Routes } from '@angular/router';
import { RouteLayerComponent } from './route-layer/route-layer.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'todo', canActivate:[authGuard], component: RouteLayerComponent, children: [
            { path: 'app', component: CreateTodoComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/todo/app', pathMatch: 'full' }
];
