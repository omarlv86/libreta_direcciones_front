import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  datos: any;
  page = 1;
  total = 0;

  constructor(private apiService: ApiService, private router: Router) {}
  inputControl = new FormControl('');
  

  ngOnInit(): void {
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        this.total = response.total / 50;
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
    this.inputControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value !== null && value !== undefined) {
        this.apiService.getDataFilter(value)
      }
    });
  }

  
  anterior():void{
    this.page--;
    console.log(this.page)
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        
        
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  siguiente():void{
    this.page++;
    console.log(this.page)
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        
        
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  
  viewDetail(id: number) {
    this.router.navigate(['/contacts/', id]); 
  }


}
