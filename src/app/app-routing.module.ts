import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddEmployeeComponent} from './components/add-employee/add-employee.component';
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {DisplayEmployeesComponent} from './components/display-employees/display-employees.component';

const routes:Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'add-employee'},
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'edit-employee/:id', component: EditEmployeeComponent},
  {path: 'display-employees', component: DisplayEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
