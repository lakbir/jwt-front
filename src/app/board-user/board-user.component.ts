import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';
  private mesArticles:any;


  constructor(private router:Router, private token: TokenStorageService, private categoryService: CategoryService) { }

  ngOnInit() {
    if(!this.token.getUser()){
      this.router.navigateByUrl('/login');
    }
    this.categoryService.getMyArticles(this.token.getUser().username).subscribe(data=>{
      this.mesArticles = data;
    },err=>{
      alert('Erreur de chargement des articles');
    })


  }
}
