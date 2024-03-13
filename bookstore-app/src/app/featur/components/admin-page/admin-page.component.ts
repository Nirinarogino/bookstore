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
  @ViewChild('container') container!: ElementRef
  @ViewChild('container_btn') containerBtn!: ElementRef
  click(){
      const allBtn = this.containerBtn.nativeElement.querySelectorAll('.emprunt')
      allBtn.forEach((btn:any)=>{
            btn.addEventListener('click', ()=>{
              const btnClass = btn.classList.value
              const classTest  = btnClass.toLowerCase().includes('visible')
              if(!classTest){
                  allBtn.forEach((elt: any)=>{
                    this.renderer.removeClass(elt,'visible')
                  })
                  this.renderer.addClass(btn,'visible')
              }   
            })
      })
  }
    
    slide(){
      const allContent = this.container.nativeElement.querySelectorAll('.content');
      allContent.forEach((element: any) => {
        const classeTeste = element.classList.value
      });

    }
  // ensuite selectionner le div  a partir du container 
  // allContent = this.container.nativeElement.querySelectorAll('.content')
 // donc on a un tableau d'un element html
 // a chaque element du tableau verfions s'il contient la classe visible
 /*
    si oui on suprime la classe visible et ajouter la classe hidden
    si non on on fait rien

  */

  ngAfterViewInit(): void {
    this.click()
    this.slide();
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
