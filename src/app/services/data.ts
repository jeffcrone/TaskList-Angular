import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
	id?: number;
	Title: string;
	Description: string;
	IsComplete: boolean;
	CreatedAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class Data {
	private apiUrl = 'https://localhost:7229/api/TaskItems';

	constructor(private http: HttpClient) { }

	getTasks(): Observable<Task[]> {
	return this.http.get<Task[]>(this.apiUrl);
	}

	getTask(id: number): Observable<Task> {
	return this.http.get<Task>(`${this.apiUrl}/${id}`);
	}

	addTask(task: Task): Observable<Task> {
	return this.http.post<Task>(this.apiUrl, task);
	}

	updateTask(task: Task): Observable<Task> {
	return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
	}

	deleteTask(id: number): Observable<void> {
	return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
