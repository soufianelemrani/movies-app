import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { range } from 'lodash';
import {
  DialogRef,
  DIALOG_DATA,
} from 'src/app/shared/model/dialog-model/dialog-ref.model';
import { Genres, isAdult } from 'src/app/shared/movie.const';
import { NotifService } from 'src/app/shared/services/notif.service';
import { Movie } from '../../movie.model';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModalComponent implements OnInit {
  editMovieForm!: FormGroup;
  years: string[] = range(1890, 2011).map((el) => el.toString());
  genres: string[] = Genres;
  constructor(
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: { movie: Movie; translate: any },
    private dialogRef: DialogRef,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.editMovieForm = this.createEditForm();
  }
  createEditForm() {
    const { runtimeMinutes, startYear, endYear, genres } = this.data.movie;
    return this.fb.group({
      isAdult: [isAdult(this.data.movie)],
      runtimeMinutes: [runtimeMinutes],
      startYear: [startYear],
      endYear: [endYear],
      genres: [genres.split(',')[0]],
    });
  }
  onCloseModal() {
    this.dialogRef.close();
  }
  onEdit() {
    if (this.checkValidity()) {
      this.notifService.openMessage(this.checkValidity() as string, {
        type: 'error',
        duration: 2500,
      });
      return;
    }
    this.dialogRef.close({
      ...this.editMovieForm.value,
      genres: [
        ...new Set([
          ...this.data.movie.genres?.split(','),
          this.editMovieForm.value.genres,
        ]),
      ].toString(),
    });
  }
  checkValidity() {
    const { startYear, endYear } = this.editMovieForm.value;
    if (!startYear || !endYear) return '';
    if (startYear > endYear) {
      return this.data.translate['EDITMOVIEERROR'];
    }
    return '';
  }
}
