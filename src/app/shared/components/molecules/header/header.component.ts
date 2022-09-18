import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  lang: string = 'eng';
  constructor(@Inject('LANGUAGE') public language: BehaviorSubject<string>) {}

  ngOnInit(): void {}
  onChangeLanguage(value: string) {
    if (value === this.language.getValue()) return;
    this.lang = value;
    this.language.next(value);
  }
}
