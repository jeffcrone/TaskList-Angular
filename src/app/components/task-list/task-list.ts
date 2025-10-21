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
				this.tasks = data;
			},
			error: (error) => {
				console.error('Error fetching tasks: ', error);
			},
			complete: () => {
			}
		});
	}

	convertDateToLocalString(dateToConvert: string) {
		return new Date(dateToConvert).toLocaleString();
	}

	deleteTask(id: number | undefined) {
		if( id && confirm("Are you sure you want to delete task " + id + "?") ) {
			this.data.deleteTask(id).subscribe({
				error: (error) => {
					console.error('Error deleting task: ', error);
				},
				complete: () => {
					window.location.reload();

					console.log('Deleted task ', id);
				}
			});
		}
	}
}
