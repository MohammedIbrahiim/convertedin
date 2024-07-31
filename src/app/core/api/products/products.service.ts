import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, startWith, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = "https://dummyjson.com/products/category"
  selectedCategorySubjcet = new BehaviorSubject<string >('beauty');
  limit = new BehaviorSubject<number >(10);
  skip = new BehaviorSubject<number >(0);
  visible = new BehaviorSubject<boolean >(false);

  selectedCategorySubjcet$ = this.selectedCategorySubjcet.asObservable()
  limit$ = this.limit.asObservable()
  skip$ = this.skip.asObservable()
  visible$ = this.skip.asObservable()
  

  setVisible(val: boolean ){
    this.visible.next(val)
  }
setcategory(val: string ){
  this.selectedCategorySubjcet.next(val)
}
setLimit(val: number){
  this.limit.next(val)
}
setSkip(val: number){
  this.skip.next(val)
}

filter$  = combineLatest({
  categoryName: this.selectedCategorySubjcet$,
  limit:this.limit$,
  skip:this.skip$
}).pipe()

result = this.filter$.pipe(
  switchMap(({categoryName,limit,skip})=> this._HttpClient.get<any>(this.baseUrl+`/${categoryName}?limit=${limit}&skip=${skip}`)
))

  // getAllProducts(categoryName:string , limit:number , skip:number):Observable<any>{
  //   return this._HttpClient.get(this.baseUrl+`/${categoryName}?limit=${limit}&skip=${skip}`)
  // }

  getAllCategory():Observable<any>{
    return this._HttpClient.get('https://dummyjson.com/products/categories')
  }
}
