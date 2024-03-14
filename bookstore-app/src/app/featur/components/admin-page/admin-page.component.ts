import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, AfterViewInit{
  
  AlluserAndBook!: any;
  AllUser!: any;
  
  token = sessionStorage.getItem('token');     
   constructor(
      private http: HttpClient,
      private renderer: Renderer2
    ){}
  @ViewChild('container') container!: ElementRef
  @ViewChild('container_btn') containerBtn!: ElementRef
  test!: number;
  slide(){
    const allContent = this.container.nativeElement.querySelectorAll('.content');
    allContent.forEach((element: any) => {
        const divClass = element.classList.value
        const classTest  = divClass.toLowerCase().includes('visible')
        if(!classTest){
             allContent.forEach((elt: any)=>{
              this.renderer.removeClass(elt,'visible')
            })
        this.renderer.addClass(element,'visible')
        }   
    });
  }
  click(){
      const allBtn = this.containerBtn.nativeElement.querySelectorAll('.emprunt')
      const testeBtn = Array.from(this.containerBtn.nativeElement.querySelectorAll('.emprunt'));
      allBtn.forEach((btn:any)=>{
            btn.addEventListener('click', ()=>{
              const btnClass = btn.classList.value
              const classTest  = btnClass.toLowerCase().includes('visible')
              const style  = btnClass.toLowerCase().includes('style')
              if(!classTest){
                  allBtn.forEach((elt: any)=>{
                      this.renderer.removeClass(elt,'visible')
                      this.renderer.removeClass(elt,'style')
                  })
              this.renderer.addClass(btn,'visible')
              this.renderer.addClass(btn,'style')
              this.test = testeBtn.indexOf(btn);
              }   
          })
      })
  }

  ngAfterViewInit(): void {
    this.click()
    this.getAllUser()
  }

  getAllUserAndBokk(){
     this.AlluserAndBook =  this.http.get('http://localhost:3000/admin',{
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
     })
     return this.AlluserAndBook;
   }
   getAllUser(){
      this.AllUser = this.http.get('http://localhost:3000/admin/all',{
        headers: {
          "Authorization": `Bearer ${this.token}`
        }
      })
      return this.AllUser
   }
   ngOnInit(): void {
    this.getAllUserAndBokk()
    
  }
  // checked(): any {
  //   return '#029197'
  // }
}
