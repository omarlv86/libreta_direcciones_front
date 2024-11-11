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
  profileForm: FormGroup;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.profileForm = this.formBuilder.group({
      id:[''],
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
    this.apiService.createContact(this.profileForm.value, this.id).subscribe(
      (response: any) => {
        if(response.status == 200){
          alert('Solicitud exitosa')
        }
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
          id: response.id,
          name: response.name,
          note: response.note,
          birthday: response.birthday,
          web: response.web,
          work: response.work
        });

        const addresses = this.profileForm.get('addresses') as FormArray;
        response.addresses.length > 0 ? this.removeAddress(0) : null
        response.addresses.forEach((address:any) => {
          addresses.push(this.addAddressToArray(address));
        });

        const mails = this.profileForm.get('mails') as FormArray;
        response.mails.length > 0 ? this.removeMail(0) : null
        response.mails.forEach((mail:any) => {
          mails.push(this.addMailToArray(mail.id, mail.email));
        });

        const cellphones = this.profileForm.get('cellphones') as FormArray;
        response.phones.length > 0 ? this.removePhone(0) : null
        response.phones.forEach((phone: any) => {
          cellphones.push(this.addPhoneToArray(phone.id, phone.phone));
        }); 

        console.log(this.profileForm.value)
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  addAddressToArray(address?: any): FormGroup {
    return this.formBuilder.group({
      id:[address.id || ''],
      street: [address?.street || ''],
      city: [address?.city || ''],
      state: [address?.state || ''],
      country: [address?.country || ''],
      postal_code: [address?.postal_code || '']
    });
  }

  addMailToArray(id?:number, mail?: string): FormGroup {
    return this.formBuilder.group({
      id:[id||''],
      email: [mail || '']
    });
  }

  addPhoneToArray(id?:number, phone?: string): FormGroup {
    return this.formBuilder.group({
      id:[id||''],
      phone: [phone || '']
    });
  }

}