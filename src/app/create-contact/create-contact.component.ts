import { CommonModule } from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormArray} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule,],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {

  formBuilder = inject(FormBuilder);

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    note: [''],
    birthday: [''],
    web: [''],
    work: [''],
    addresses: this.formBuilder.array([this.createAddress()]),
    mails: this.formBuilder.array([this.createMail()]),
    cellphones: this.formBuilder.array([this.createPhone()]),
  });

  constructor() {}

  createAddress(): FormGroup {
    return this.formBuilder.group({
      street: [''],
      state: [''],
      city: [''],
      country: ['']
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
  }
}