import moment from 'moment';

class EmployeeDTO {
  constructor(data) {
    this.id = data.empNo;
    this.birthDate = moment(data.birthDate).toISOString();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
    this.hireDate = moment(data.hireDate).toISOString();
  }
}

export default EmployeeDTO;
