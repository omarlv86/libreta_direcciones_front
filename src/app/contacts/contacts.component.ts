import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  datos: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDatos().subscribe(
      (response: any) => {
        this.datos = response;
        console.log(this.datos);
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

}
