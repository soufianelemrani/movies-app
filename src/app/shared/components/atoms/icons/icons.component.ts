import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-icons',
  template: `<img
    (click)="clickable && onClick.emit()"
    [src]="src"
    alt=""
    [ngStyle]="{ cursor: clickable && 'pointer' }"
  /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent implements OnInit {
  src!: string;
  imgPath: string = `assets/icons/`;
  @Output() onClick = new EventEmitter<unknown>();
  @Input() clickable: boolean = false;
  icon!: string;
  @Input('icon') set _icon(icon: string) {
    this.icon = icon;
    this.src = `${this.imgPath}${this.icon}.${this.extension || 'svg'}`;
  }
  constructor(@Attribute('extension') public extension: string) {}

  ngOnInit(): void {}
}
