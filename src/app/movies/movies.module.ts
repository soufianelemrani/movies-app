import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { HttpClientModule } from '@angular/common/http';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

@NgModule({
  declarations: [ContainerComponent, EditModalComponent],
  imports: [CommonModule, SharedModule, HttpClientModule],
  exports: [ContainerComponent],
})
export class MoviesModule {}
