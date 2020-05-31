import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../services/api/api.service';
import {Employee} from '../../model/employee';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.scss']
})
export class DisplayEmployeesComponent {
  employeeData:any = [];
  dataSource:MatTableDataSource<Employee>;
  @ViewChild(MatPaginator, {static: false}) paginator:MatPaginator;
  displayedColumns:string[] = ['_id', 'firstName', 'lastName', 'gender', 'email', 'position', 'dateOfBirth', 'action'];

  constructor(private apiService:ApiService) {
    this.apiService.GetEmployees().subscribe(data => {
      this.employeeData = data;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  deleteEmployee(index:number, e):void {
    if (window.confirm('Are you sure')) {
      const data:Employee[] = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.apiService.DeleteEmployee(e._id).subscribe();
    }
  }
}
