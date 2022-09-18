import { Component, Host, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxGroupComponent } from '../../molecules/checkbox-group/checkbox-group.component';

@Component({
  selector: 'app-checkbox',
  template: `<div class="form-container">
    <input (click)="onSelect()" type="checkbox" [checked]="isChecked" />
    <label>{{ label }}</label>
  </div> `,
})
export class CheckboxComponent implements OnInit {
  @Input() value!: string;
  @Input() label!: string;
  constructor(@Host() private readonly checkboxGroup: CheckboxGroupComponent) {}

  ngOnInit(): void {}

  onSelect() {
    this.checkboxGroup.onChangeValue(this.value);
  }
  get isChecked() {
    return this.checkboxGroup.isSelected(this.value);
  }
}
