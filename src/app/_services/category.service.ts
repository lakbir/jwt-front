import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const host:string="http://localhost:8080/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private http:HttpClient) { }

  public getAllCategories(){
    return this.http.get(host+'categories');
  }

  public getAllArticles(){
    return this.http.get(host+'articles?page=0&size=20');
  }

  public getArticleByCategorie(id:number){
    return this.http.get(host+'categories/'+id+'/articles');
  }

  public searshArticles(mc:string){
    return this.http.get(host+'articles/search/articlesByKeyword?mc='+mc);
  }

  public addNewArticle(article:any){
    return this.http.post(host+'api/articles/add',{
      title:article.titre,
      description:article.description,
      user:article.user,
      category:{id:article.category}
    }, httpOptions);
  }

  public getMyArticles(user:string){
    return this.http.get(host+'articles/search/articlesByUser?user='+user);
  }

  public addNewCategory(category:any){
    return this.http.post(host+'api/category/add',{
      name:category.name,
      description:category.description
    },httpOptions);
  }

  public updateCategory(category:any){
    return this.http.put(host+'api/category/update',{
      id:category.id,
      name:category.name,
      description:category.description
    },httpOptions);
  }

  public getCategory(idCat:number){
    return this.http.get(host+'categories/'+idCat);
  }

  public deleteCategory(idCat:number){
    return this.http.delete(host+'api/category/delete?id='+idCat);
  }

  public getArticleById(idArticle:number){
    return this.http.get(host+'articles/'+idArticle);
  }
}
