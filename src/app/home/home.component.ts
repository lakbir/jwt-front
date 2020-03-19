import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {CategoryService} from '../_services/category.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  private categories:any;
  private currentCategorie:any;
  private articles:any;
  isLoggedIn = false;

  constructor(private userService: UserService,
              private categoryService:CategoryService,
              private route:Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.categoryService.getAllCategories().subscribe(data=>{
      this.categories = data;
    },err=>{
      alert("Erreur de charger la liste des categories");
    });
    this.categoryService.getAllArticles().subscribe(data=>{
      this.articles = data;
    },err=>{
      alert("Erreur de charger la liste des articles");
    })
  }

  onSelectCategory(c) {
    this.currentCategorie = c;
    this.categoryService.getArticleByCategorie(c.id).subscribe(data=>{
      this.articles = data;
    })
  }

  onSearchArticles(dataForm: any) {
    this.categoryService.searshArticles(dataForm.motCle).subscribe(data=>{
      this.articles = data;
    },err=>{
      console.log("recherche erreur : "+err);
    })
  }

  onShowArticle(idArticle:number){
    this.route.navigateByUrl('articles/'+idArticle);
  }
}
