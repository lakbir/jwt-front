import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  private authorize:boolean=false;
  private admins:any;

  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit() {
    if(this.token.getUser().roles.some(e => e === 'ROLE_ADMIN')){
      this.authorize = true;
    }else {
      this.authorize = false;
    }
    this.getAllAdmins();
  }

  onDeleteAdmin(idUser:number){
    if(confirm("Vous voulez vaiment supprimer cette administrateur ? ")) {
      this.userService.onDeleteAdmin(idUser).subscribe(
        data=>{
          console.log('User supprime avec succes');
          this.getAllAdmins();
        },err=>{
          console.log('Erreur de supprimer user');
        }
      )
    }
  }

  private getAllAdmins() {
    this.userService.getAllAdmins().subscribe(
      data=>{
        console.log(data);
        this.admins = data;
      },err=>{
        alert('Erreur de chargement les utilisateurs');
      }
    );
  }
}
