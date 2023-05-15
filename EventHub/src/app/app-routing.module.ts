import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './auth.guard'; // Can Activate 
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    // Interface [Gurad File Name AuthGuard Auth he user define nav ahe]
    canActivate: [AuthGuard], // AuthGuard file name Line 6
    // Jar key nasel tar tithunach log in sathi gelay router.navigate karun
    component: SpecialEventsComponent
    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'form', component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
