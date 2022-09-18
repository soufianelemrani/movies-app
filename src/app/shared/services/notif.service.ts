import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { NotifComponent } from '../components/atoms/notif/notif.component';
import { NotifConfig, NOTIF_DATA } from '../model/notif.model';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  openMessage(message: string, config: NotifConfig) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .top()
      .centerHorizontally();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      panelClass: 'overlay-notif-panel',
    });
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: NOTIF_DATA,
          useValue: {
            ...config,
            message,
          },
        },
      ],
    });
    const portal = new ComponentPortal(NotifComponent, null, injector);
    overlayRef.attach(portal);
    setTimeout(() => {
      overlayRef.dispose();
    }, config.duration);
  }
}
