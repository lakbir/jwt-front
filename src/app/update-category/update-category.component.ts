import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  private authorize:boolean=false;
  private modeAdded:number=0;
  private currentCategory:any;
  constructor(private activatedRoute: ActivatedRoute,private token: TokenStorageService,private categoryService:CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategory(this.activatedRoute.snapshot.params.id).subscribe(
      data=>{
        this.currentCategory = data;
      },err=>{
        console.log('Erreur de charger category');
      }
    )

    if(this.token.getUser().roles.some(e => e === 'ROLE_ADMIN')){
      this.authorize = true;
    }else {
      this.authorize = false;
    }
  }

  public onUpdateCategory(){
    this.categoryService.updateCategory(this.currentCategory).subscribe(
      data=>{
        this.currentCategory = data;
        this.modeAdded = 1;
      }, err=>{
        console.log('Erreur de modifier cette categorie');
      }
    )
    console.log(this.currentCategory);
  }

}
