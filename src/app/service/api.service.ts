import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../model/questions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private data: string = ""

  constructor(private http: HttpClient) {
    this.data = "assets/data/quizz_questions.json"
  }

  getData(): Observable<Questions> {
    return this.http.get<Questions>(this.data)
  }
}
