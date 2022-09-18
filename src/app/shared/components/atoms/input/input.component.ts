import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `<div *ngIf="label; else box" class="form-container">
      <label>{{ label }}</label>
      <ng-container *ngTemplateOutlet="box"></ng-container>
    </div>
    <ng-template #box>
      <input
        [ngStyle]="{ width: width }"
        [type]="type"
        [formControl]="control"
        [placeholder]="placeholder"
        min="0"
      />
    </ng-template> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input()
  control!: FormControl<string>;
  @Input() label!: string;
  @Input()
  type: 'number' | 'text' = 'number';
  @Input() placeholder: string = '';
  @Input() width!: string;
  constructor() {}

  ngOnInit(): void {}
}
