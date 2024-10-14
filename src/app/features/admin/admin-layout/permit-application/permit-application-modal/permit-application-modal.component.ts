import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-permit-application-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permit-application-modal.component.html',
  styleUrl: './permit-application-modal.component.css'
})
export class PermitApplicationModalComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit(); // Emit the close event
  }
}
