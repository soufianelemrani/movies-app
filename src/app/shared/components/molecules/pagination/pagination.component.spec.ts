import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

fdescribe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    })
      .overrideComponent(PaginationComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit next page ', () => {
    spyOn(component.goTo, 'emit');
    component.current = 3;
    fixture.detectChanges();
    component.onGoTo('next');
    fixture.detectChanges();
    expect(component.goTo.emit).toHaveBeenCalledOnceWith({
      action: 'next',
      value: 3,
    });
    fixture.detectChanges();
  });
  it('should go to a specified page', () => {
    spyOn(component.goTo, 'emit');
    component.current = 1;
    component.total = 15;
    fixture.detectChanges();
    component.current = 12;
    fixture.detectChanges();
    component.onGoTo('page', 14);
    expect(component.goTo.emit).toHaveBeenCalledOnceWith({
      action: 'page',
      value: 14,
    });
    fixture.detectChanges();
  });

  describe('it should update the displayed page', () => {
    it('it should not display ... pages', () => {
      component.pages = component.getPages(5, 5);
      expect(component.pages).not.toContain(-1);
    });
    it('should display ... page', () => {
      component.pages = component.getPages(6, 10);
      expect(component.pages).toContain(-1);
      expect(component.pages).toEqual([1, -1, 6, 7, 8, 9, 10]);
    });

    it('should render ...', () => {
      component.pages = component.getPages(6, 10);
      component.current = 6;
      component.total = 10;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelectorAll('span')[2]?.textContent).toBe('...');
      component.pages = component.getPages(2, 2);
      component.current = 2;
      component.total = 2;
      fixture.detectChanges();
      expect(
        compiled.querySelectorAll('span')[3]?.textContent
      ).not.toBeDefined();
    });
  });
});
