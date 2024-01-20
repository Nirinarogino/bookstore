import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormControl, FormGroup, Validators } from'@angular/forms'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private Http: HttpClient
  ){}
  // ===============VARIABLE =============
  bookForm!: FormGroup;
  titleCtrl!: FormControl;
  authorCtrl!:  FormControl;
  publisherCtrl!: FormControl;
  descriptionCtrl!: FormControl;
  categoryCtrl!:  FormControl;
  languageCtrl!:  FormControl;
  coverPathCtrl!:  FormControl;
  publicationDAteCtrl!: FormControl;
  bookFile!: FormControl;

//  ==========METHODE===================

unitForm(){
    this.bookFile = this.formBuilder.control(null);
   this.authorCtrl = this.formBuilder.control('');
   this.authorCtrl.updateValueAndValidity();
   this.authorCtrl.addValidators([Validators.required]);

   this.publisherCtrl = this.formBuilder.control('');
   this.publisherCtrl.updateValueAndValidity();
   this.publisherCtrl.addValidators([Validators.required]);

   this.descriptionCtrl = this.formBuilder.control('');
   this.descriptionCtrl.updateValueAndValidity();
   this.descriptionCtrl.addValidators([Validators.required]);

   this.categoryCtrl = this.formBuilder.control('');
   this.categoryCtrl.updateValueAndValidity();
   this.categoryCtrl.addValidators([Validators.required]);

   this.languageCtrl = this.formBuilder.control('');
   this.languageCtrl.updateValueAndValidity();
   this.languageCtrl.addValidators([Validators.required]);

   this.coverPathCtrl = this.formBuilder.control('');
   this.coverPathCtrl.updateValueAndValidity();
   this.coverPathCtrl.addValidators([Validators.required]);

   this.publicationDAteCtrl = this.formBuilder.control('');
   this.publicationDAteCtrl.updateValueAndValidity();
   this.publicationDAteCtrl.addValidators([Validators.required]);

   this.bookForm = this.formBuilder.group({
    title: this.titleCtrl,
     author: this.authorCtrl,
     publisher: this.publisherCtrl,
     description: this.descriptionCtrl,
     category: this.categoryCtrl,
     language: this.languageCtrl,
     coverPath: this.coverPathCtrl,
     publicationDAte: this.publicationDAteCtrl
   })
}

onSelectFile(event: any): void {
  const files = (event.target as HTMLInputElement).files;
  this.bookFile.patchValue(files![0]);
  this.bookFile.updateValueAndValidity();
}

onsubmit() {
  const formdata = new FormData();
  const book_data = this.bookForm.value;
  formdata.set("file", this.bookFile.value);
  formdata.append("jsonData", JSON.stringify(book_data));
  console.log(formdata);
  
  this.Http.post('http://localhost:3000/book/add', formdata, 
    { 
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5hbmRyYWluYTIyIiwidXNlcmlkIjo0LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDU3Nzg2NDIsImV4cCI6MTcwNTc4MjI0Mn0.aFHr6L1_aQH3yI8CbCrudn6u3RWwp5gzNtAIcYixVVBdQXGWVs3OZqy2H0KukYbi11BmGoJRC0FEGt18WHwTUQ"
      }
    }
  ).subscribe();
}
ngOnInit(): void {
  this.unitForm();
  
}
}