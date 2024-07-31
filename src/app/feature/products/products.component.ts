import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../component/side-bar/side-bar.component';
import { CardComponent } from '../../component/card/card.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SideBarComponent,CardComponent,AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


constructor(){}
  ngOnInit(): void {}


}
