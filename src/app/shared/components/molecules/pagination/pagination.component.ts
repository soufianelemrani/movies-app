import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Output() goTo = new EventEmitter<{
    action: 'next' | 'previous' | 'page';
    value: number;
  }>();
  pages!: number[];
  constructor() {}

  ngOnInit(): void {}
  onGoTo(action: 'next' | 'previous' | 'page', page?: number) {
    if (this.current !== page) {
      this.goTo.emit({ action, value: page || this.current });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }
  getPages(current: number, total: number): number[] {
    if (total === 5) return [1, 2, 3, 4, 5];
    if (current >= 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }
    if (total < 5) {
      return [...Array(total).keys()].map((e) => ++e);
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
