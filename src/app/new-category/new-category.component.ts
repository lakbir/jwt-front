import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  private authorize:boolean=false;
  private modeAdded:number=0;
  private currentCategory:any;

  constructor(private token:TokenStorageService, private categoryService:CategoryService) { }

  ngOnInit() {
    if(this.token.getUser().roles.some(e => e === 'ROLE_ADMIN')){
      this.authorize = true;
    }else {
      this.authorize = false;
    }
  }

  onAddCategory(category:any){
    this.categoryService.addNewCategory(category).subscribe(data=>{
      console.log(data);
      this.modeAdded = 1;
      this.currentCategory = data;
    },err=>{
      console.log(err);
    })
  }

}
