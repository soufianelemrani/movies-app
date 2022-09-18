import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'app-tags',
  template: `<div class="tag">
    <span>{{ title }}</span>
    <span [title]="value">{{ value }}</span>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  @Input() title!: string;
  @Input() value!: string;
  constructor() {}

  ngOnInit(): void {}
}
