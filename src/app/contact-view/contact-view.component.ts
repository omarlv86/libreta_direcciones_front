import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css'
})
export class ContactViewComponent {
  
  //parametroId : string;
  id : any;
  contact: any;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getDataById(params.get('id'));
    })
  }

  getDataById(id:any):void{
    console.log(id)
    this.apiService.getDataById(id).subscribe(
      (response: any) => {
        this.contact = response[0];
        console.log(this.contact)
      },
      (error: any) => {
        console.error('Error al realizar la solicitud:', error);
      }
    );
  }

}
