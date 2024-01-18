import { Component } from '@angular/core';
import { SingleServiceService } from '../../services/single-service.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent {
  isClicked!: boolean;
  constructor() { }
  click() {
    if(this.isClicked){
      this.isClicked = false;
      console.log(this.isClicked);
      
    } else{
      this.isClicked = true;
      console.log(this.isClicked);

    }
  }
}
