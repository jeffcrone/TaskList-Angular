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
	submitButtonDisplayText: string = "";
	taskInfo: Task | null = null;
	taskId: string | null = null;
	taskTitle: string | null = null;
	taskDescription: string | null = null;
	taskIsComplete: boolean | null = null;
	taskCreatedAt: string | null = null;

	constructor(private data: Data) {
		const idParam = this.activatedRoute.snapshot.paramMap.get('id');
		this.taskId = idParam;

		if( idParam ) {
			this.submitButtonDisplayText = "Update";
			this.data.getTask(Number(idParam)).subscribe({
				next: (data) => {
					this.taskInfo = data;
					this.taskTitle = data.title;
					this.taskDescription = data.description;
					this.taskIsComplete = data.isComplete;
					this.taskCreatedAt = data.createdAt;
				},
				error: (error) => {
					console.error('Error fetching task: ', error);
				},
				complete: () => {
				}
			});

		} else {
			this.submitButtonDisplayText = "Save";
		}
	}

	handleSubmit(): void {
		if( this.taskId ) {
			// Update
			let updateTask: Task = {
				id: parseInt(this.taskId, 10),
				title: this.taskTitle || "",
				description: this.taskDescription || "",
				isComplete: this.taskIsComplete || false,
				createdAt: this.taskCreatedAt || ""
			};
			this.data.updateTask(updateTask).subscribe({
				error: (error) => {
					console.error('Error updating task: ', error);
				},
				complete: () => {
					alert("Task updated successfully.");
				}
			});
		} else {
			// Save
			let saveTask: Task = {
				title: this.taskTitle || "",
				description: this.taskDescription || "",
				isComplete: this.taskIsComplete || false,
				createdAt: this.taskCreatedAt || ""
			};
			this.data.addTask(saveTask).subscribe({
				error: (error) => {
					console.error('Error saving task: ', error);
				},
				complete: () => {
					alert("Task added successfully.");
				}
			});
		}
	}
}
