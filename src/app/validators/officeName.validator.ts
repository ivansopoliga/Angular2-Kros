import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';
import {OfficeService} from '../services/office.service';

function validateName() {
  var valid = true;
  return (officesList, name:FormControl) => {
    for (var i = 0; i < officesList.length; i++) {
      if (officesList[i].name == name.value) {
        valid = false;
        break;
      }
    }
    return (valid) ? null : {
      validateOfficeName: {
        valid: false
      }
    };
  }
}

@Directive({
  selector: '[validateofficename][ngModel],[validateofficename][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => OfficeNameValidator), multi: true }, OfficeService
  ]
})

export class OfficeNameValidator {

  private offices;
  private result:Function;

  constructor(private officeService:OfficeService) { }

  validate(c:FormControl) {
    this.officeService.getOffices().subscribe(
      data => {this.offices = data.json()},
      error => console.log(error),
      () => {
        this.result = validateName();
        return this.result(this.offices, c);
      }
    );
  }
}
