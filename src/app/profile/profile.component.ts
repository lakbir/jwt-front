import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService,private router:Router, private userService:UserService) { }

  ngOnInit() {
    if(!this.token.getUser()){
      this.router.navigateByUrl('/login');
    }

    console.log('User ID : '+this.token.getUser().id);

    this.userService.onGetUserById(this.token.getUser().id).subscribe(
      data=>{
        this.currentUser = data;
        this.currentUser.roles = this.token.getUser().roles;
      },err=>{
        console.log('Erreur de charger user connecte : '+err);
      }
    )

  }
}
