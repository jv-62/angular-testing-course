import {HttpClient} from '@angular/common/http';
import {Injectable,inject} from '@angular/core';
import {Observable} from 'rxjs';
import {TagInterface} from '../types/tag.interface';

@Injectable()
export class ApiService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3004/';

  constructor() { }
  
  getTags(): Observable<TagInterface[]>{
    return this.httpClient.get<TagInterface[]>(`${this.apiUrl}tags`);
  }
  
  createTags(name: string): Observable<TagInterface>{
    return this.httpClient.post<TagInterface>(`${this.apiUrl}tags`, {name});
  }
  
}
