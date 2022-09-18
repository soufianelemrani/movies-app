import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  template: `<div class="form-container">
    <label>{{ label }}</label>
    <select [ngStyle]="{ width: width }" [formControl]="control">
      <option *ngFor="let op of options" [value]="op">{{ op }}</option>
    </select>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() label!: string;
  @Input()
  options: string[] = [];
  @Input() control!: FormControl<string>;
  @Input() width!: string;
  constructor() {}

  ngOnInit(): void {}
}
