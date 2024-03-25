import { ActivatedRoute, Route, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { HomeService } from '../../services/home-service.service';
import { SigninService } from 'src/app/auth/services/signin.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { bookSearchType } from '../enums/search-book.enum';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, AfterViewInit{
  
// ============= Variable ===========
  mybook!: Book;  
  book$!: any;
  token = sessionStorage.getItem('token')
  adminTeste !: boolean;
  @Input() Book!: Book;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  otherBook$!: Observable<any>
  searchTypeOptions!: {
    value: bookSearchType,
    label: string
}[];
 constructor(
  private route: ActivatedRoute,
  private homeService: HomeService,
  private router:Router,
  private signinService: SigninService,
  private formBuilder: FormBuilder
  ){}
 
  @ViewChild('category') category!: ElementRef;
  testeAdmin(){
    const teste = this.signinService.decodeMyToken(this.token)
    if(teste.role  === 'admin'){
      this.adminTeste = true
    }
  }
  goToAdmin(){
    this.router.navigate(['bookstore/admin'])
  }
   selectByCategory(){
      const div = this.category.nativeElement // selectionner le container des catergory de book
      const container = div.querySelectorAll(`.cat`); // selectionner les elt qui ont la classe cat
      container.forEach((elt:any)=>{ // a chaque elt du container 
        elt.addEventListener('click', ()=>{ // ajouter une evenement clique
          const span = elt.querySelector('span') // selectionner l'element span dans chauqe element cliquer
         const category = span.innerHTML // contenu du span
          this.getBookByCategory(category) // appelle au fonction getBookCategory
         
        })
      })
  }

  getbook(): Observable<Book[]>{
    this.book$ = this.homeService.getAllBooks()
    return this.book$
    }
    onViewDetails(bookId: number) { 
      this.router.navigateByUrl(`bookstore/${bookId}`); 
  }
  async getBookByCategory(category: string){
      this.book$ = await this.homeService.getBookByCategory(category)
      return this.book$
  }

  initform() {
     this.searchCtrl = this.formBuilder.control('');
     this.searchTypeCtrl = this.formBuilder.control(bookSearchType.title)
     this.searchTypeOptions = [
      {value:bookSearchType.title, label:'title'},
      {value:bookSearchType.author, label:'author'}
     ]
  }

  private initObservable(){
   const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
  );
      const  searchType$: Observable<bookSearchType> = this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
  );
    this.book$ = combineLatest([
      search$,
      searchType$,
      this.homeService.getAllBooks()
    ]).pipe(
      map(([search, searchType, books]) => books.filter(book => book[searchType]
        .toLowerCase()
        .includes(search as string)))
    )
  }
  Deconnexion(){
    this.router.navigate(['./'])
  }

  ngOnInit(): void {
    this.getbook()
    this.testeAdmin()
    this.initform()
    this.initObservable()
  }
  ngAfterViewInit(): void {
    this.selectByCategory()
  }
}
