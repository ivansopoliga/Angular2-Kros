import {Directive, forwardRef, OnInit} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';




@Directive({
  selector: '[validatePassword][ngModel],[validatePassword][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidator), multi: true }
  ]
})

export class PasswordValidator{

  validate(c:FormControl){
    var password:string;
    if(c.value != null)
      password = c.value.toUpperCase();
    if(/^[A-Z]{2}$/.test(password))
      return null;
    else return {validatePassword: true}

  }
}
