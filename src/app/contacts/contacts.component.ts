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
  pagination = 50;

  constructor(private apiService: ApiService, private router: Router) {}
  inputControl = new FormControl('');
  

  ngOnInit(): void {
    this.getDataContact();
    this.inputControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (value !== null && value !== undefined) {
        this.apiService.getDataFilter(value)
      }
    });
  }

  /**
  * Get data Contact and total pages
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param 
  * @return 
  */
  getDataContact():void{
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        this.total = response.total / this.pagination;
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  /**
  * before page in table
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param 
  * @return 
  */
  before():void{
    this.page--;
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        
        
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  /**
  * next page in table
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param 
  * @return 
  */
  next():void{
    this.page++;
    this.apiService.getDatos(this.page).subscribe(
      (response: any) => {
        this.datos = response.data;
        
        
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  
  /**
  * Go to view contact detail
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param id 
  * @return 
  */
  viewContactDetail(id: number) {
    this.router.navigate(['/contacts/show', id]); 
  }

  /**
  * Delete Contact
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param id 
  * @return 
  */
  deleteContact(id: number) {
    this.apiService.deleteContact(id).subscribe(
      (response: any) => {
        this.getDataContact();
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

  /**
  * Delete Contact
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param id 
  * @return 
  */
  createContact() {
    console.log('crear contacto');
    this.router.navigate(['/contacts/create']); 
    
    /* this.apiService.deleteContact(id).subscribe(
      (response: any) => {
        this.getDataContact();
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    ); */
  }

  /**
  * Delete Contact
  *
  * @author ricardo omar lugo vargas <omarl.vargass@hotmail.com>
  * @created 2024-11-09
  * @param id 
  * @return 
  */
  updateContact(id:number) {
    console.log('actualizar contacto', id)
    this.router.navigate(['/contacts/update', id]); 
    /* this.apiService.deleteContact(id).subscribe(
      (response: any) => {
        this.getDataContact();
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    ); */
  }


}
