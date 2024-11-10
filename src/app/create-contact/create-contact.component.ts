import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css'
})
export class CreateContactComponent {

  title:string = '';
  formularioContacto!: FormGroup;
  direcciones: any[] = [];
  telefonos: any[] = [];
  correos: any[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('id: ',params.get('id'))
      this.title = params.get('id') == null ? 'Crear' : 'Actualizar'
    })
  }

}
