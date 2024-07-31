import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productAction } from '../../feature/state/product-type';
import { select, Store } from '@ngrx/store';
import { ProductState } from '../../feature/state';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";
import { ProductsService } from '../../core/api/products/products.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AddToCartComponent , AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent { 
  constructor(private _ProductsService:ProductsService){}
  searchControl = new FormControl();
  visible$ = this._ProductsService.visible
  showDialog() {
    this._ProductsService.setVisible(true)
  }
  }
