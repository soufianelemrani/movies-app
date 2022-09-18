import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `<div class="modal">
    <div class="title">
      <span>{{ title }}</span>
      <app-icons
        clickable="true"
        (onClick)="onClick()"
        icon="X_icon"
      ></app-icons>
    </div>
    <main>
      <ng-content> </ng-content>
    </main>
    <footer>
      <ng-content select="[footer]"></ng-content>
    </footer>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() title!: string;
  @Output() onClose = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onClose.emit();
  }
}
