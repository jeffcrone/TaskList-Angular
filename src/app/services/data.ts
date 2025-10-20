import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Task {
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
	private apiUrl = 'https://localhost:7229/items'; // Adjust if your JSON-Server port is different

	constructor(private http: HttpClient) { }

	getItems(): Observable<Task[]> {
	return this.http.get<Task[]>(this.apiUrl);
	}

	getItem(id: number): Observable<Task> {
	return this.http.get<Task>(`${this.apiUrl}/${id}`);
	}

	addItem(task: Task): Observable<Task> {
	return this.http.post<Task>(this.apiUrl, task);
	}

	updateItem(task: Task): Observable<Task> {
	return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
	}

	deleteItem(id: number): Observable<void> {
	return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
