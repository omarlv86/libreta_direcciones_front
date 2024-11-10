import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactViewComponent } from './contact-view/contact-view.component';

export const routes: Routes = [
    {path: '', component: ContactsComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'contacts/:id', component: ContactViewComponent},
];
