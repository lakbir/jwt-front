import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private authorize:boolean=false;
  private users:any;
  constructor(private token: TokenStorageService, private userService:UserService) { }

  ngOnInit() {
    if(this.token.getUser().roles.some(e => e === 'ROLE_ADMIN')){
      this.authorize = true;
    }else {
      this.authorize = false;
    }
    this.getAllUsers();
  }

  onDeleteUser(idUser:number){
    if(confirm("Vous voulez vaiment supprimer cette utilisateur ? ")) {
      this.userService.onDeleteUser(idUser).subscribe(
        data=>{
          console.log('User supprime avec succes');
          this.getAllUsers();
        },err=>{
          console.log('Erreur de supprimer user');
        }
      )
    }
  }

  private getAllUsers(){
    this.userService.getAllUsers().subscribe(
      data=>{
        console.log(data);
        this.users = data;
      },err=>{
        alert('Erreur de chargement les utilisateurs');
      }
    )
  }

}
