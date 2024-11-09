import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  datos: any;
  page = 1;
  total = 0;

  constructor(private apiService: ApiService) {}
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

  
  onSearch(event: any) {
    
    if(event.target.value.length > 2){
      console.log(event.target.value)
    }
    /* this.searchQuery = query.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.toLowerCase().includes(this.searchQuery)
    ); */
  }

}
