import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { ProductsService } from '../../core/api/products/products.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AddToCartComponent, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private _ProductsService: ProductsService,
    private elRef: ElementRef
  ) {}
  searchControl = new FormControl();
  visible$ = this._ProductsService.visible;

  showDialog() {
    this._ProductsService.setVisible(true);
  }

  // ==================== for closing dialog when click outside ===================
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this._ProductsService.setVisible(false);
    }
  }

  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
