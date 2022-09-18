import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { DialogRef, DIALOG_DATA } from '../model/dialog-model/dialog-ref.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
export interface DialogConfig {
  data?: any;
  width?: string;
  height?: string;
}
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  destroyed$ = new Subject();
  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private breakpointObserver: BreakpointObserver
  ) {}
  open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    const isSmallScreen =
      this.breakpointObserver.isMatched('(max-width :576px)');

    const overlay = this.overlay.position().global().centerHorizontally();
    const positionStrategy = isSmallScreen
      ? overlay.top('50px')
      : overlay.centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      width: '25rem',
    });
    const dialogRef = new DialogRef(overlayRef);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
    overlayRef
      .backdropClick()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => overlayRef.dispose())
      .add(() => {
        this.destroyed$.next(1);
        this.destroyed$.complete();
      });
    return dialogRef;
  }
}
