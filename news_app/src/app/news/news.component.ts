import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/internal/operators/map';
import { timer } from 'rxjs/internal/observable/timer';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  constructor(public appService: AppService) { }
  
  newsData: any;

  newsList :News[]=[]

  length = 100;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5,10,15,20,50];
  showFirstLastButtons = true;

  searchKeyword:any 
  searchPhrase: String='top-headlines?country=us';
  subscription !: Subscription;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(){
    this.getNews(this.searchPhrase,this.pageSize,this.pageIndex);
    this.subscription = timer(0, 300000).pipe(
      switchMap(() => this.appService.getNews('top-headlines?country=us',this.pageSize,this.pageIndex))
    ).subscribe(result =>{
      console.log(result)
      this.newsData = result
      this.newsList = this.newsData.articles
    }
    );
  }

  getNewsbySearchKeyword(){
    this.range.reset()
    this.searchPhrase = 'everything?q='+this.searchKeyword
    this.getNews(this.searchPhrase,this.pageSize,this.pageIndex)
  }

  onDateChange(){
    this.searchKeyword=''
    this.searchPhrase='top-headlines?country=us&from='+this.range.value.start?.toISOString()+'&to='+this.range.value.end?.toISOString()
    if(this.range.value.end?.toISOString())  this.getNews(this.searchPhrase,this.pageSize,this.pageIndex)
    
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex+1;
    this.getNews(this.searchPhrase,this.pageSize,this.pageIndex);
  }

  getNews(searchPhrase:any,pageSize:any,pageIndex:any){
          this.newsList = []
        this.appService.getNews(searchPhrase,pageSize,pageIndex).subscribe(
        (data)=>{
          this.newsData = data
          this.newsList = this.newsData.articles
          console.log(this.newsList)
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}


interface News {
  source:Object
  author:any
  title: string;
  urlToImage: any;
  description:any;
  content:any
  url:any
  publishedAt:any
}


