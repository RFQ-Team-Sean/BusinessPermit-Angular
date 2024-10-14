import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private selectedMenuLabel = new BehaviorSubject<string>('Dashboard Overview');
  selectedMenuLabel$ = this.selectedMenuLabel.asObservable();

  setSelectedMenuLabel(label: string) {
    this.selectedMenuLabel.next(label);
  }
}
