import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {

  private  currentArticle:any;
  constructor(private activatedRoute:ActivatedRoute, private categoryService:CategoryService) { }

  ngOnInit() {
    let idArticle = this.activatedRoute.snapshot.params.id;
    this.categoryService.getArticleById(idArticle).subscribe(
      data=>{
        this.currentArticle = data;
      },err=>{
        console.log('erreur de charger article : '+err);
      }
    )
  }

}
