import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { HomeService } from '../../services/home-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
// ============= Variable ===========
  mybook!: Book;  
  book$!: Observable<Book[]>;
  @Input() Book!: Book;

 constructor(
  private route: ActivatedRoute,
  private homeService: HomeService,
  private router:Router,
  
  ){}
  getbook(): Observable<Book[]>{
    this.book$ = this.homeService.getAllBooks()
    return this.book$
    }
    onViewDetails(bookId: number) { // Corrected parameter name to bookId
      this.router.navigateByUrl(`home/${bookId}`); // Corrected typo and used bookId parameter
  }
  ngOnInit(): void {
    this.getbook()
  }
}
