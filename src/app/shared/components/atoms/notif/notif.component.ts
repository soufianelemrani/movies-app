import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
} from '@angular/core';
import {
  NotifConfig,
  NotifData,
  NOTIF_DATA,
} from 'src/app/shared/model/notif.model';

@Component({
  selector: 'app-notif',
  template: `<div class="notif">
    <app-icons style="display: flex" [icon]="type" extension="png"></app-icons>
    <span>{{ message }}</span>
  </div> `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(200),
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifComponent implements OnInit {
  @HostBinding('@flyInOut')
  message: string = this.data.message;
  type: string = this.data.type;
  duration: number = this.data.duration;

  constructor(@Inject(NOTIF_DATA) private data: NotifData) {}

  ngOnInit(): void {}
}
