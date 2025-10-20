import { Component } from '@angular/core';
import { Data, Task } from '../../services/data';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {

	tasks: Task[] = [];

	constructor(private data: Data) { }

	ngOnInit() {
		this.data.getTasks().subscribe({
			next: (data) => {
				console.log(data);
				this.tasks = data;
			},
			error: (error) => {
				console.error('Error fetching tasks: ', error);
			},
			complete: () => {
				console.log('complete');
			}
		});
	}
}
