import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu-service.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
  export class HeaderComponent implements OnInit {
    selectedMenuLabel: string = 'Dashboard Overview'; 

    constructor(private menuService: MenuService) {}

    ngOnInit(): void {
      this.menuService.selectedMenuLabel$.subscribe(label => {
        this.selectedMenuLabel = label;
      });
    }
}
