import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, map, observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { HomeService } from '../../services/home-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

  // ============= Variable ===========
  book$!: Observable<Book[]>;

 constructor(
  private route: ActivatedRoute,
  private homeService: HomeService
  
  ){}
  getbook(): Observable<Book[]>{
    this.book$ = this.homeService.getAllBooks()
    console.log(this.book$)
    return this.book$
    }
  ngOnInit(): void {
    this.getbook()
  }

}
