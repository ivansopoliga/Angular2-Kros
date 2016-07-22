import {Directive, forwardRef, OnInit} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';
import {OfficeService} from '../services/office.service';

@Directive({
  selector: '[validateOfficeName][ngModel],[validateOfficeName][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => OfficeNameValidator), multi: true }, OfficeService
  ]
})

export class OfficeNameValidator{

  private offices;

  constructor(private officeService:OfficeService) {
    this.officeService.getOffices().subscribe(
      data => {this.offices = data.json()},
      error => console.log(error)
    );
  }

  validate(c:FormControl){
    if(this.offices)
    {
      for(var i = 0; i < this.offices.length; i++)
      {
        if(this.offices[i].name == c.value)
          return {validateOfficeName: true}
      }
    }
    return null;
  }

}
