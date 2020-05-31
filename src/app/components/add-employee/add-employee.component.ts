import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetEmployeeForm', {static: false}) myNgForm;
  employeeForm:FormGroup;
  positions:string[] = ['Software Engineer', 'Program Manager', 'Support Engineer', 'Researcher', 'Electrical Engineer'];

  constructor(public fb:FormBuilder, private router:Router, private ngZone:NgZone, private apiService:ApiService) {
  }

  ngOnInit():void {
    this.submitBookForm();
  }

  /* Reactive book form */
  submitBookForm():void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['Male'],
      email: ['', [Validators.required]],
      position: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  /* Date */
  formatDate(e):void {
    const convertDate:string = new Date(e.target.value).toISOString().substring(0, 10);
    this.employeeForm.get('dateOfBirth').setValue(convertDate, {
      onlyself: true
    });
  }

  /* Get errors */
  handleError(controlName:string, errorName:string):boolean {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitEmployeeForm():void {
    if (this.employeeForm.valid) {
      this.apiService.AddEmployee(this.employeeForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/display-employees'));
      });
    }
  }
}
