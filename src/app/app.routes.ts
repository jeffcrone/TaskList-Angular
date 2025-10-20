import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
	{ path: '', redirectTo: '/items', pathMatch: 'full' },
	{ path: 'items', component: TaskList },
	{ path: 'items/add', component: TaskForm },
	{ path: 'items/edit/:id', component: TaskForm },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }