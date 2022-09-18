import { outputAst } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-input-search',
  template: `<div class="input-search-container">
    <app-input
      [placeholder]="
        ('SEARCHPLACEHOLDER' | translate: fileLanguage) || 'Search a movie...'
      "
      [control]="search"
      type="text"
    ></app-input>
    <app-icons icon="icon_magnify"></app-icons>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent implements OnInit, OnDestroy {
  @Input() search: FormControl<string> = new FormControl();
  destroyed$ = new Subject();
  @Input() eng!: Object;
  @Input() fr!: Object;
  fileLanguage!: Object;
  @Output() onSearch = new EventEmitter<string>();
  constructor(
    @Inject('LANGUAGE') public language: BehaviorSubject<string>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.language.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      res === 'eng'
        ? (this.fileLanguage = this.eng)
        : (this.fileLanguage = this.fr);
      this.cdr.detectChanges();
    });
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe((res) => {
        this.onSearch.emit(res);
      });
  }
}
