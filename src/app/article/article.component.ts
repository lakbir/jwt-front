import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../_services/category.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private categories:any;
  private modeAdded = 0;
  private currentArticle:any;
  constructor(private categoryService:CategoryService, private token: TokenStorageService,private router:Router) { }

  ngOnInit() {
    if(!this.token.getUser()){
      this.router.navigateByUrl('/login');
    }
    this.categoryService.getAllCategories().subscribe(data=>{
      this.categories = data;
    },err=>{
      alert("Erreur de charger la liste des categories");
    });
  }

  onAddArticle(article: any) {
    article.user=this.token.getUser().username;
    this.categoryService.addNewArticle(article).subscribe(data=>{
      console.log(data);
      this.currentArticle = data;
      this.modeAdded = 1;
    },err=>{
      console.log(err);
    })
  }
}
