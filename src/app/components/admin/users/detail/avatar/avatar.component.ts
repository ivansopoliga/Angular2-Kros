/**
 * Created by Ondrej on 21.07.2016.
 */
import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'avatar',
  templateUrl: 'app/components/admin/users/detail/avatar/avatar.component.html',
})

export class AvatarComponent {
  @Input() avatarData;


}
