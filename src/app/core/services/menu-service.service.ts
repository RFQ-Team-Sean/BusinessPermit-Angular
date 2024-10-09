import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Subject to hold the current selected menu label
  private selectedMenuLabel = new BehaviorSubject<string>('Dashboard Overview');
  selectedMenuLabel$ = this.selectedMenuLabel.asObservable();

  // Function to update the selected menu label
  setSelectedMenuLabel(label: string) {
    this.selectedMenuLabel.next(label);
  }
}
