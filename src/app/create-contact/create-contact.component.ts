import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {

  title:string = '';
  contactForm = new FormGroup({
    name: new FormControl(''),
    note: new FormControl(''),
    birthday: new FormControl(''),
    web: new FormControl(''),
    work: new FormControl(''),
    //address: new FormGroup([]),
  });
  addresses: any[] = [];
  cellphones: any[] = [];
  mails: any[] = [];


  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('id') == null ? 'Crear' : 'Actualizar'
    })
  }

  addAddress() {
    this.addresses.push({ calle: '', ciudad: '' });
  }
  addCellphone() {
    this.cellphones.push({ phone: ''});
  }
  addMail() {
    this.mails.push({ email: ''});
  }


}
