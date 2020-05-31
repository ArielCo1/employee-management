import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild('resetEmployeeForm', {static: false}) myNgForm;
  formGroup:FormGroup;
  positions:string[] = ['Software Engineer', 'Program Manager', 'Support Engineer', 'Researcher', 'Electrical Engineer'];

  ngOnInit():void {
    this.updateBookForm();
  }

  constructor(public fb:FormBuilder, private router:Router, private ngZone:NgZone, private actRoute:ActivatedRoute, private apiService:ApiService) {
    const id:string = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.GetEmployee(id).subscribe(data => {
      this.formGroup = this.fb.group({
        firstName: [data.firstName, [Validators.required]],
        lastName: [data.lastName, [Validators.required]],
        gender: [data.gender],
        email: [data.email, [Validators.required]],
        position: [data.position, [Validators.required]],
        dateOfBirth: [data.dateOfBirth, [Validators.required]]
      });
    });
  }

  /* Reactive book form */
  updateBookForm():void {
    this.formGroup = this.fb.group({
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
    this.formGroup.get('dateOfBirth').setValue(convertDate, {
      onlyself: true
    });
  }

  /* Get errors */
  public handleError (controlName:string, errorName:string):boolean {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateEmployeeForm():void {
    const id:string = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.apiService.UpdateEmployee(id, this.formGroup.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/display-employees'));
      });
    }
  }
}
