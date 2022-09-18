import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { LANGUAGE } from 'src/app/shared/model/notif.model';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { IconsComponent } from '../../atoms/icons/icons.component';
import { TagsComponent } from '../../atoms/tags/tags.component';

import { CardInfosComponent } from './card-infos.component';
export const MockupMovie = {
  endYear: '\\N',
  genres: 'Documentary,Short',
  isAdult: '0',
  originalTitle: 'Pompiers à Lyon',
  primaryTitle: 'Pompiers à Lyon',
  runtimeMinutes: '1',
  startYear: '1896',
  tconst: 'tt0000104',
  titleType: 'short',
};
fdescribe('CardInfosComponent', () => {
  let component: CardInfosComponent;
  let fixture: ComponentFixture<CardInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardInfosComponent,
        TagsComponent,
        IconsComponent,
        TranslatePipe,
      ],
      providers: [
        ChangeDetectorRef,
        {
          provide: 'LANGUAGE',
          useValue: new BehaviorSubject('fr'),
        },
      ],
    })
      .overrideComponent(CardInfosComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CardInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display correct data', () => {
    component.movie = MockupMovie;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-tags')[3].textContent).toContain('-');
    expect(compiled.querySelectorAll('app-tags')[4].textContent).toContain(
      'No'
    );
  });
  it('should emit edit', () => {
    spyOn(component.editMovie, 'emit');
    component.onEdit(MockupMovie);
    expect(component.editMovie.emit).toHaveBeenCalledOnceWith(MockupMovie);
  });

  it('should translate tags to french', () => {
    spyOn(component.language, 'subscribe');
    component.movie = MockupMovie;
    component.fileLanguage = {
      ISADULT: 'Adulte',
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelectorAll('app-tags')[4].querySelector('span')
        ?.textContent
    ).toBe('Adulte');
  });
});
