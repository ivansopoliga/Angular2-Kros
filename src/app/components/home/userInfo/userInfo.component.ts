import {Component,Input} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, CanActivate} from '@angular/router';
import {UserService} from '../../../services/user.service';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'user_info',
  templateUrl: 'app/components/home/userInfo/userInfo.component.html',
  styleUrls: ['app/components/home/userInfo/userInfo.component.css'],
  directives: [ROUTER_DIRECTIVES, UserInfoComponent]

})
export class UserInfoComponent {
  public p = JSON.parse('[{"id":2002,"email":"ondrejpudis@gmail.com","name":"Ondrej","surname":"Pudiš","roles":[{"roleId":1}]}]');
  public o=JSON.parse('[{"id":2002,"email":"ondrejpudis@gmail.com","name":"Ondrej","surname":"Pudiš","photoBase64":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABxZJREFUeJztm2tsFUUUx39F+qYilIemtCo+SiOiID6CqMH4NoBUo9EvfiAxhg8owcQYNFERpD6iIYji6wMxhoBAfCRGUUQjBqGiICBqUmspFEvLowXio6V+ODvZs7e79+7M3Xv9YP/JZufenfOY2ZkzZ86chQEMYAD/ZxTkQcZgYDIwFagDaoFqoAIY4tU5DnQD+4C9wE/A18B3QE8edEwcxUA9sA7oAvocry5gLTDL45k4kh4BI4F5wIPAsIg6nUATcAx56yCjYShwHjA8gu4w8CrwMtCRkL6JYQjQAJyk/1vcCiwGbgQqY/AaAdwEPAs0hvA74fErT7QFWaAeaCWoZDuwELggAf61wCLgUIqMFmBmAvydUQq8nqLUQWAuUJYDeeXI9GpPkbkcKMmBvLSoBnYoJXqBpcg8zjWGIY0+peRvB6ryIBuQpaxFCW8FrsmXcIVpQJvSoxmZLjlFHcG5uAkxWv8VRiP+grY9Vp1gswxWA5u9O8B64D7gT0sexiGqwrfkJ5CRtBtp0AELnmXAKmC69/t3YIolj4woJTjn1yEeXhwMAu4FttB/SYu6vgLuIP4LGgx8SNAmJGoYtbXfZMG8Bhk1rp7gp8ComLLKUmS9EpMuI+oV01bE24uD8wkaqV7gfWA2cClizU9D3l4lMAnxIDcQ7IQmYExMmWciS7GhnZ6+emZU4Ds5vcS39mXAHqXIZuyM02TgR0XfCBTFpL0ef4lsJkuPsUEpsdSC7ilF9wluG5kK4FvFZ74F7QpF94yDbEDmnvHtDxLfySkHjnp0HcTz/6NQg2yV+4A/iN+Rw/GX6+OuOizC78W5FnR3K7oFLoJT8LziN8OC7hFF97St0GJk+2mcCxvfXq8YY20Fh2CC4rfMgm4IsvU2IzGuDQGCln+hDSGwzaNLyhEpAI54PL+xpNU2zGrnuE4R2m5pzdz70pIuHYwxbLOkG4/fjjVxiQqRSE0f8jZt0YPvLSaFjzyefzvQ7vRojyJ+RwCDQgguww9WbnAQaIT0OtBGwQRG47rfGqYNQ4GJqQ/DOmCqKn/hILBLCUwKJk541IF2oyr3c+TCOqBOlbc7CDTGr8aBNgqGl4th/V6V61IfhnWAcVk7vcsWzd79XELmnAOK8LfgTQ70bfjR537ueFgHZCMM4FfvXkQyo2Asvp6/ONCbDRVh+oR1QIV3P+YgDORUx2CcIw8NPWx/duRh2lKR+iCsA8wK0B3yLA72qPJ4Rx4aF6nybkcexjDH6gAD12Vslypf7MhDQ3firsha6RHZlrAOOO7dXWP7nfjW+hJHHhoTvHsz/pu0hWlLv1Ed1gGmUjbR3p3efRzZxeZK8V3xnekqZoBpS6wO2Ofds7Hgjd69CNkdunhwhcDbinZrFvqc7d1b4lR+E38DEXXCmwmjCB5hfYa/vMZBNRJ8NfT7stBltOKzIg7BfEVwg6NQgCvwt7FmMzKb9Ia3ALg/ha4d3w644DbFa14cgisVgXUkJQUXIq6ojvJuQTZcqbic/mcH2xCPMhvomMDkOASD8bM6GjPUjYNC4HHkBMko0gVcpepcjR/76wP+QQIxVlGcCJjo8hEsXPO1SpkkwloA5wDvKL6r1LP31P/rCdm0OKJO8V1tQzhLETqHlUNwuuL7rvp/tfq/NEF5zym+NgFVivEDiu0JKqU74C31/0r1f1LJFbGColEW+S8kIQnkKOyBBBQaBNylfreq8n5Vrk+jlw3m4AdSluEQThuBHFv3IYHOM2LSFSLJC08iZ4G7kRB7L/5bPkVwnzBJPTPHcB3IifRa4AngWuI7VJX4Yf1uojPPMmKxUipTTH4M8BL+sEt3PRZCvyAGXQfwIpnTYd5QNFkt5eUE02GmhdQpQByMsBS5HiRAshGx9EuRJS8KU5A8wDXA50gAxESZ9XXSkxmWP3CzqvcbCdiUmYrhfsS11FieotwBYAkSgEzCeJZ4vJZ48rWs1ByAKuQM0Ty/PQH5gBhEw3QzfsPuUf+fAB4iGeclCkXAwwRH253es3L8U6k+7E6zM6KEoEv7AeLYmPnegwzffOE6/ByAQ8jO9WOl3zZykFtchQQljJBuVbY9P0wC2snRujQBZ+VKaC39MzUbkaUv3ygmmLjVh8z/JNJz06KW4EhoI7ttsytuIWjwmshD4w2qkFMj3fuvkYXDYYFKgkEbMwpzNuyjUIIsQ1qRTiSgkotU9grgUYLBEmPtc/IxRVzMQLIzUzuigWRyd+uAF/BdW+3kJLbOZ4tyZNusgxrm2oF8/HAr8XIMRyENa0DOAVL5dSPubSK7xqQ/malEnKE5RGdmdSLu9SHEoSlAGjMSid6m+9RmGTLkDyencm5QhLjQa/BT5lyuI0iwZDo5Wmrz9dncRIKfzdUgRs2c1XV7Vwvy2dxeJGH6B5LNNBnAAAYwgAD+BSgBe09B+XKTAAAAAElFTkSuQmCC","roles":[{"roleId":1},{"roleId":2002},{"roleId":2003}]}]')

  private error: string;


  constructor(private router: Router, private userService: UserService) {
  }

/*
  BUTTON ODHLASENIE
  onSubmit() {
    this.userService.logout()
      .subscribe(

        data => {

          this.router.navigate(['/login']);
          console.log("Odhlasenie");
        },
        error => {

          console.log('Nepodarilo sa odhlasit');
        },
        () => {


          console.log("()");
        }

      );
  }*/



}
