import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Task } from '../../services/data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
	private activatedRoute = inject(ActivatedRoute);
	taskInfo: Task | null = null;
	taskTitle: string | null = null;

	constructor(private data: Data) {
		const idParam = this.activatedRoute.snapshot.paramMap.get('id');

		if( idParam ) {
			this.data.getTask(Number(idParam)).subscribe({
				next: (data) => {
					console.log(data);
					this.taskInfo = data;
				},
				error: (error) => {
					console.error('Error fetching task: ', error);
				},
				complete: () => {
					console.log('complete');
				}
			});

		}
	}
}
