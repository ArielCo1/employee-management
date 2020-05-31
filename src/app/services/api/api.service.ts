import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Employee} from '../../model/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = 'http://localhost:8000/api';
  headers:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) {
  }

  // Add employee
  AddEmployee(data:Employee):Observable<Object> {
    const API_URL = `${this.endpoint}/add-employee`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.getError)
      );
  }

  // Get all employees
  GetEmployees():Observable<Object> {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Employee
  GetEmployee(id):Observable<any> {
    const API_URL = `${this.endpoint}/read-employee/${id}`;
    return this.http.get(API_URL, {headers: this.headers})
      .pipe(
        map((res:Response) => {
          return res || {};
        }),
        catchError(this.getError)
      );
  }

  // Update Employee
  UpdateEmployee(id, data):Observable<Object> {
    const API_URL = `${this.endpoint}/update-employee/${id}`;
    return this.http.put(API_URL, data, {headers: this.headers})
      .pipe(
        catchError(this.getError)
      );
  }

  // Delete employee
  DeleteEmployee(id):Observable<Object> {
    const API_URL = `${this.endpoint}/delete-employee/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.getError)
      );
  }

  // Error handling
  getError(error:HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
