import { ComponentType } from '@angular/cdk/portal';
import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IconsComponent } from 'src/app/shared/components/atoms/icons/icons.component';
import { InputSearchComponent } from 'src/app/shared/components/atoms/input-search/input-search.component';
import { CardInfosComponent } from 'src/app/shared/components/molecules/card-infos/card-infos.component';
import { MockupMovie } from 'src/app/shared/components/molecules/card-infos/card-infos.component.spec';
import { HeaderComponent } from 'src/app/shared/components/molecules/header/header.component';
import { PaginationComponent } from 'src/app/shared/components/molecules/pagination/pagination.component';
import { DialogRef } from 'src/app/shared/model/dialog-model/dialog-ref.model';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import {
  DialogConfig,
  ModalService,
} from 'src/app/shared/services/modal.service';
import { NotifService } from 'src/app/shared/services/notif.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';
import { MoviesService } from '../movies.service';

import { ContainerComponent } from './container.component';
export class MovieServiceMockup {
  getMovies() {
    return of(
      [...Array(107).keys()]
        .map((_) => ({
          ...MockupMovie,
        }))
        .concat({ ...MockupMovie, genres: 'romance' })
    );
  }
  getEnglish() {
    return of({
      ISADULT: 'Is adult',
    });
  }
  getFrench() {
    return of({
      ISADULT: 'Adulte',
    });
  }
}
export class NotifServiceMockup {
  openMessage(message: string, config: any) {}
}
export class ModalServiceMockup {
  open<T>(component: ComponentType<T>, config?: DialogConfig) {
    return {
      afterClosed: () => {},
    };
  }
}
fdescribe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let movieService: MoviesService;
  let notifService: NotifService;
  let modalService: ModalService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        ContainerComponent,
        HeaderComponent,
        InputSearchComponent,
        PaginationComponent,
        CardInfosComponent,
        IconsComponent,
        TranslatePipe,
      ],
      providers: [
        {
          provide: ModalService,
          useClass: ModalServiceMockup,
        },
        {
          provide: NotifService,
          useClass: NotifServiceMockup,
        },
        ViewportScroller,

        {
          provide: 'LANGUAGE',
          useValue: new BehaviorSubject('fr'),
        },
        {
          provide: 'Document',
          useValue: {},
        },
        {
          provide: MoviesService,
          useClass: MovieServiceMockup,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MoviesService);
    notifService = TestBed.inject(NotifService);
    modalService = TestBed.inject(ModalService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display  15 movies', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-card-infos').length).toBe(15);
    expect(component.showMovies.length).toEqual(15);
  });
  it('should initialize pagination', () => {
    fixture.detectChanges();
    expect(component.totalPage).toEqual(8);
  });

  it('should render new result on search', () => {
    fixture.detectChanges();

    component.onSearch('romance');
    expect(component.showMovies.length).toBe(1);
    expect(component.totalPage).toBe(1);
  });

  it('should display info message when no result was found', () => {
    const spy = spyOn(notifService, 'openMessage');
    component.fileLanguage = {
      NORESULTFOUND: 'Rien...',
    };
    fixture.detectChanges();
    component.onSearch('ldfhsdkfjm');
    expect(spy).toHaveBeenCalledWith('Rien...', {
      type: 'info',
      duration: 1500,
    });
  });
});
