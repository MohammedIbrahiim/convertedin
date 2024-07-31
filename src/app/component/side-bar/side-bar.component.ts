import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ProductsService } from '../../core/api/products/products.service';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { select,Store } from '@ngrx/store';
import { productAction } from '../../feature/state/product-type';
import { ProductState} from '../../feature/state'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CheckboxModule,SliderModule, FormsModule ,InputTextModule,NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  category:any[]=[]
  categoryName:string ='beauty'
  data$: Observable<any> | undefined;

  constructor(private _productsService:ProductsService, private _store:Store<ProductState>,
    private __destroyRef: DestroyRef,
  ){
  this.data$ = this._store.pipe(select(state => state.product));

  }
  ngOnInit(): void {
    this.getCategory()  
    this.data$?.pipe(
      map(products => products.filter),
      tap(filter => this.categoryName =filter),
      takeUntilDestroyed(this.__destroyRef)
    ).subscribe(console.log
    );
  }
  rangeValues: number[] = [1, 5];
  changeSlider(event:SliderChangeEvent){
  }
  getCategory(){
    this._productsService.getAllCategory().pipe(
      takeUntilDestroyed(this.__destroyRef),
      map((res) => {
        this.category= res  
        return res;
      }),
    ).subscribe()
  
  }

  getCategoryName(name:string = 'beauty'){
    this.categoryName = name
    this._store.dispatch(productAction.setFilter({filter:name}));

    this._productsService.setcategory(name)
    this._store.dispatch(productAction.loadData({page:0,row:10,filter:name}));
    
  }
}
