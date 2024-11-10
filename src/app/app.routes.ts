import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

export const routes: Routes = [
    {path: '', component: ContactsComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'contacts/show/:id', component: ContactViewComponent},
    {path: 'contacts/create', component: CreateContactComponent},
    {path: 'contacts/update/:id', component: CreateContactComponent},
];
