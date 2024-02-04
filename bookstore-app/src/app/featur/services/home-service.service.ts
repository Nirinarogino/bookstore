import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';

@Injectable()
export class HomeService {
    constructor(
        private http: HttpClient, // Correct typo here
        private router: Router // Correct typo here
    ) {}

    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`http://localhost:3000/book/all`); // Corrected http to this.http
    }

  
}
