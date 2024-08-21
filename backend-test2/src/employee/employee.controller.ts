import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee-metrics')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('count')
  async countEmployees() {
    return this.employeeService.countEmployees();
  }

  @Get('average-salary')
  async averageSalary() {
    return this.employeeService.averageSalary();
  }

  @Get('salary-range')
  async salaryRange() {
    return this.employeeService.salaryRange();
  }

  @Get('age-distribution')
  async ageDistribution() {
    return this.employeeService.ageDistribution();
  }

  @Get('gender-distribution')
  async genderDistribution() {
    return this.employeeService.genderDistribution();
  }

  @Get('marital-status-distribution')
  async maritalStatusDistribution() {
    return this.employeeService.maritalStatusDistribution();
  }

  @Get('date-of-joining-histogram')
  async dateOfJoiningHistogram() {
    return this.employeeService.dateOfJoiningHistogram();
  }

  @Get('top-interests')
  async topInterests() {
    return this.employeeService.topInterests();
  }

  @Get('designation-distribution')
  async designationDistribution() {
    return this.employeeService.designationDistribution();
  }
}
