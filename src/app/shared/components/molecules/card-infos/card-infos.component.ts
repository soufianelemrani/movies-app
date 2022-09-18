import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/movies/movie.model';
import { isAdult } from 'src/app/shared/movie.const';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrls: ['./card-infos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfosComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  @Input() eng!: Object;
  @Input() fr!: Object;
  fileLanguage!: Object;
  @Output() editMovie = new EventEmitter<Movie>();
  destroyed$ = new Subject();
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
  }
  isAdult(movie: Movie) {
    return isAdult(movie);
  }

  displayInfos(Infos: string) {
    return Number.isInteger(+Infos) ? Infos : '-';
  }
  onEdit(movie: Movie) {
    this.editMovie.emit(movie);
  }
}
