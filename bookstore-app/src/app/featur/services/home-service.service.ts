import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { environement } from 'src/environements/environement';

@Injectable()
export class HomeService {
    constructor(private Http: HttpClient){}
    // ============= Variable ================

    getAllBooks(): Observable<Book[]>{
       return  this.Http.get<Book[]>(`${environement.apiUrl}/all`)
    }
}
