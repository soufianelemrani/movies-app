import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  template: `<div class="form-container">
    <label>{{ label }}</label>
    <ng-content></ng-content>
  </div> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxGroupComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  value!: string | null;
  @Input() label!: string;
  onChange = (value: string | null) => {};
  onTouch = () => {};
  isDisabled!: boolean;

  constructor() {}
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  onChangeValue(value: string) {
    if (this.value === value) {
      this.value = null;
      this.onChange(this.value);
      this.onTouch();
      return;
    }
    this.value = value;
    this.onChange(this.value);
    this.onTouch();
  }
  isSelected(value: string) {
    return this.value === value;
  }
}
