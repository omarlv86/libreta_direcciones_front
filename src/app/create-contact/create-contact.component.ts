import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormArray} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule,],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {

  formBuilder = inject(FormBuilder);

  /* profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    note: [''],
    birthday: [''],
    web: [''],
    work: [''],
    addresses: this.formBuilder.array([this.createAddress()]),
    mails: this.formBuilder.array([this.createMail()]),
    cellphones: this.formBuilder.array([this.createPhone()]),
  }); */
  profileForm: FormGroup;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      note: [''],
      birthday: [''],
      web: [''],
      work: [''],
      addresses: this.formBuilder.array([this.createAddress()]),
      mails: this.formBuilder.array([this.createMail()]),
      cellphones: this.formBuilder.array([this.createPhone()]),
    });
  }

  id!: string;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id != null){
      this.loadData(this.route.snapshot.params['id'])
    }
  }

  createAddress(): FormGroup {
    return this.formBuilder.group({
      street: [''],
      state: [''],
      city: [''],
      country: [''],
      postal_code: ['']
    });
  }

  get addresses(): FormArray {
    return this.profileForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  createMail(): FormGroup {
    return this.formBuilder.group({
      email: [''],
    });
  }

  get mails(): FormArray {
    return this.profileForm.get('mails') as FormArray;
  }

  addMail(): void {
    this.mails.push(this.createMail());
  }

  removeMail(index: number): void {
    this.mails.removeAt(index);
  }

  createPhone(): FormGroup {
    return this.formBuilder.group({
      phone: [''],
    });
  }

  get cellphones(): FormArray {
    return this.profileForm.get('cellphones') as FormArray;
  }

  addPhone(): void {
    this.cellphones.push(this.createPhone());
  }

  removePhone(index: number): void {
    this.cellphones.removeAt(index);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.apiService.createContact(this.profileForm.value).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  loadData(id:any){
    this.apiService.getDataById(id).subscribe(
      (response: any) => {
        console.log(response)
        this.profileForm.patchValue({
          name: response.name,
          note: response.note,
          birthday: response.birthday,
          web: response.web,
          work: response.work
        });

        const addresses = this.profileForm.get('addresses') as FormArray;
        response.addresses.length > 0 ? this.removeAddress(0) : null
        response.addresses.forEach((address:any) => {
          addresses.push(this.addAddressToArray(address)); // Asegúrate de crear un método que lo permita
        });

        const mails = this.profileForm.get('mails') as FormArray;
        response.mails.length > 0 ? this.removeMail(0) : null
        response.mails.forEach((mail:any) => {
          mails.push(this.addMailToArray(mail.email)); // Asegúrate de crear un método que lo permita
        });

        const cellphones = this.profileForm.get('cellphones') as FormArray;
        response.phones.length > 0 ? this.removePhone(0) : null
        response.phones.forEach((phone: any) => {
          console.log('phone', phone.phone)
          cellphones.push(this.addPhoneToArray(phone.phone)); // Asegúrate de crear un método que lo permita
        }); 


      console.warn('profileForm: ', this.profileForm.value);

      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  addAddressToArray(address?: any): FormGroup {
    return this.formBuilder.group({
      // Define tus campos de dirección aquí
      street: [address?.street || ''],
      city: [address?.city || ''],
      state: [address?.state || ''],
      country: [address?.country || ''],
      postal_code: [address?.postal_code || '']
    });
  }

  addMailToArray(mail?: string): FormGroup {
    return this.formBuilder.group({
      email: [mail || '']
    });
  }

  addPhoneToArray(phone?: string): FormGroup {
    return this.formBuilder.group({
      phone: [phone || '']
    });
  }

}