import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CategoryService} from '../_services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';
  authorize:boolean=false;
  private categories:any;

  constructor(private userService: UserService, private route: Router, private token:TokenStorageService, private categoryService: CategoryService) { }

  ngOnInit() {
   if(this.token.getUser().roles.some(e => e === 'ROLE_ADMIN')){
     this.authorize = true;
     this.getCategories();
   }else {
     this.authorize = false;
   }
  }

  private getCategories(){
    this.categoryService.getAllCategories().subscribe(data=>{
      this.categories = data;
    },err=>{
      alert("Erreur de charger les categories");
    })
  }

  onDeleteCategory(idCat:any){
    if(confirm("Vous voulez vaiment supprimer cette categorie ? ")) {
      this.categoryService.deleteCategory(idCat).subscribe(
        data=>{
          console.log('Categorie supprime');
          this.getCategories();
          this.route.navigateByUrl('/admin');
        },err=>{
          console.log('Erreur de supprimer le categorie : '+err);
        }
      )
    }
  }
}
