import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  fromEvent,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NotifService } from 'src/app/shared/services/notif.service';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';
import { Movie, PaginationAction } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent implements OnInit, OnDestroy {
  eng!: Object;
  fr!: Object;
  fileLanguage!: any;
  destroyed$ = new Subject();
  currentPage: number = 1;
  totalPage!: number;
  movieShownPerPage: number = 15;
  showMovies: Movie[] = [];
  Movies!: Movie[];
  isScrollable$: Observable<boolean> = this.initScrollObservable();
  icon: 'X_icon' | 'icon_magnify' = 'icon_magnify';
  searchControl: FormControl<string> = new FormControl();
  paginationAction: PaginationAction = {
    next: () => ++this.currentPage,
    previous: () => --this.currentPage,
    page: (page) => {
      this.currentPage = page as number;
    },
  };
  constructor(
    private movieService: MoviesService,
    private modalService: ModalService,
    private notifService: NotifService,
    @Inject('LANGUAGE') public language$: BehaviorSubject<string>,
    @Inject(DOCUMENT) private readonly document: Document,
    private cdr: ChangeDetectorRef,
    private readonly viewport: ViewportScroller
  ) {}
  ngOnDestroy(): void {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.getLanguages();
    this.movieService
      .getMovies()
      .pipe(take(1))
      .subscribe((res) => {
        this.totalPage = this.getTotalPage(res);
        this.Movies = res;
        this.displayMovie(this.Movies);
        this.cdr.detectChanges();
      });
  }

  getLanguages() {
    forkJoin([this.movieService.getEnglish(), this.movieService.getFrench()])
      .pipe(
        switchMap(([eng, fr]) =>
          this.language$.pipe(
            map((lang) => ({
              eng,
              fr,
              file: lang === 'eng' ? eng : fr,
            }))
          )
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe(({ eng, fr, file }) => {
        this.eng = eng;
        this.fr = fr;
        this.fileLanguage = file;
      });
  }
  displayMovie(arr: Movie[]) {
    this.showMovies = [
      ...arr
        .slice((this.currentPage - 1) * this.movieShownPerPage)
        .slice(0, this.movieShownPerPage),
    ];
  }
  onChangePage(res: { action: string; value: number }) {
    this.paginationAction[res.action](res.value);
    this.displayMovie(this.Movies);
    this.onScrollTop();
  }
  onSearch(value: string) {
    this.icon = value ? 'X_icon' : 'icon_magnify';
    if (!value) {
      this.totalPage = this.getTotalPage(this.Movies);
      this.currentPage = 1;
      this.displayMovie(this.Movies);
      return;
    }
    const trimedVal = value.trim().toLowerCase();
    const result = this.Movies.filter(
      (el) =>
        this.isIncluded(el.primaryTitle, trimedVal) ||
        this.isIncluded(el.originalTitle, trimedVal) ||
        this.isIncluded(el.genres, trimedVal)
    );
    if (result.length === 0) {
      this.notifService.openMessage(this.fileLanguage['NORESULTFOUND'], {
        type: 'info',
        duration: 1500,
      });
      return;
    }
    this.totalPage = this.getTotalPage(result);
    this.currentPage = 1;
    this.displayMovie(result);
  }

  isIncluded(value: string, searchKey: string) {
    return value?.toLowerCase().includes(searchKey);
  }
  getTotalPage(arr: Movie[]) {
    return Math.ceil(arr.length / this.movieShownPerPage);
  }
  onEdit(movie: Movie) {
    const modal = this.modalService.open(EditModalComponent, {
      data: { movie, translate: this.fileLanguage },
    });
    modal
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((res) => {
        this.Movies = this.Movies.map((el) =>
          el.tconst === movie.tconst ? { ...el, ...res } : el
        );
        this.showMovies = this.showMovies.map((el) =>
          el.tconst === movie.tconst ? { ...el, ...res } : el
        );

        this.notifService.openMessage(this.fileLanguage['EDITMOVIESUCCESS'], {
          type: 'success',
          duration: 2500,
        });
        this.cdr.detectChanges();
      });
  }
  onClear() {
    this.searchControl.setValue('');
    this.icon = 'icon_magnify';
  }
  onScrollTop() {
    this.viewport.scrollToPosition([0, 0]);
  }
  initScrollObservable() {
    return fromEvent(this.document, 'scroll').pipe(
      takeUntil(this.destroyed$),
      map(() => this.viewport.getScrollPosition()?.[1] > 0)
    );
  }
  trackByTconstFn(_: number, data: Movie) {
    return data.tconst;
  }
}
