import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateEmployeeData } from 'src/app/interface/employer.interface';
import { Page } from 'src/app/interface/paginator/page';
import { CreateProjectData } from 'src/app/interface/project.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<String>();
  @Output() createEvent = new EventEmitter<any>();
  @Output() employeeEvent = new EventEmitter<String>();
  @Output() projectEvent = new EventEmitter<String>();
  @Input() item : String = '';
  @Input() status: string = '';
  @Input() role : String = '';
  @Input() projectList : CreateProjectData[] = [];
  selectedResults!: CreateProjectData[];
  @Input() employeeList : CreateEmployeeData[] = [];
  selectedEmployees!: CreateEmployeeData[];
  page!: Page<any>;
  userId!: Number;
  all!: string;

  constructor(private auth_service: AuthService) { }

  ngOnInit(): void {
    this.userId = this.auth_service.getUserId();
  }

  create() {
    this.createEvent.emit();
  }

  search(value: string) {
    this.searchEvent.emit(value);
  }

  onSelectEmployee(event: any) {
    if (event.value == 'all') {
      event.value = undefined
    }
    this.employeeEvent.emit(event.value);
  }

  onSelectProject(event: any) {
    if (event.value == 'all') {
      event.value = undefined
    }
    this.projectEvent.emit(event.value);
  }
}
