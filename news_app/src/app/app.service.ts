import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http:HttpClient) { }


  BASE_NEWS_API = 'https://newsapi.org/v2/'
  // API_KEY= 'a4904d5e0218459184d699dccec9b5e1'
  API_KEY= 'a4904d5e0218459184d6'

  getNews(searchPhrase:String,pagesize:number,page:number){    
    const NEWS_API = this.BASE_NEWS_API+searchPhrase+'&pageSize='+pagesize+'&page='+page+'&apiKey='+this.API_KEY
    return this.http.get(NEWS_API);
  }
  
}
