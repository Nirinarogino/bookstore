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
onSubmit() {
  const formdata = new FormData();

  // Assuming this.bookForm is a FormGroup
  const book_data = this.bookForm.value;

  // Assuming this.bookFile is a FormControl representing the file input
  const fileValue = this.bookFile.value;

  // Append the file to FormData
  formdata.append("file", fileValue);
  const token = sessionStorage.getItem('token');

  // Append the JSON data to FormData
  formdata.append("jsonData", JSON.stringify(book_data));
  this.Http.post('http://localhost:3000/book/add', formdata,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  ).subscribe(()=>{
    console.log(formdata);
  });
}



ngOnInit(): void {
  this.unitForm();
  
}
}