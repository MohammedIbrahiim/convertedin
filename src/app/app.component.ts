import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./component/side-bar/side-bar.component"; 
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { CardComponent } from "./component/card/card.component";
import { NavBarComponent } from "./component/nav-bar/nav-bar.component";
import { AddToCartComponent } from "./component/add-to-cart/add-to-cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, SliderModule, CheckboxModule, CardComponent, NavBarComponent, AddToCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'convertedin';
}
