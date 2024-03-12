import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, AfterViewInit{
  
  AlluserAndBook!: any;
  token = sessionStorage.getItem('token');     
   constructor(
      private http: HttpClient,
      private renderer: Renderer2
    ){}
  @ViewChild('haut') haut!: ElementRef
  @ViewChild('bas') bas!: ElementRef
  @ViewChild('book') book!: ElementRef
  @ViewChild('user') user!: ElementRef
  switchDiv(elt: any, deleteClass: any, addClass: any){
      elt.nativeElement.addEventListener('click',()=>{
      const classNow = deleteClass.nativeElement.classList.value
      const classTest  = classNow.toLowerCase().includes('visible')
      if(classTest){

          this.renderer.removeClass(deleteClass.nativeElement, 'visible')
          this.renderer.addClass(deleteClass.nativeElement, 'hidden')
          this.renderer.removeClass(addClass.nativeElement, 'hidden')
          this.renderer.addClass(addClass.nativeElement, 'visible')
      }
      else{
        console.log(classTest);
        
      }
    })
  }
  ngAfterViewInit(): void {
    this.switchDiv(this.user, this.haut, this.bas)
    this.switchDiv(this.book, this.bas, this.haut)
  } 
  getAllUserAndBokk(){
     this.AlluserAndBook =  this.http.get('http://localhost:3000/admin',{
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
     })
     return this.AlluserAndBook;
      
   }
   ngOnInit(): void {
    this.getAllUserAndBokk()
    
  }
}
