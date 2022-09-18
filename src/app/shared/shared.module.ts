import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/atoms/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/atoms/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/molecules/checkbox-group/checkbox-group.component';
import { SelectComponent } from './components/atoms/select/select.component';
import { HeaderComponent } from './components/molecules/header/header.component';
import { InputSearchComponent } from './components/atoms/input-search/input-search.component';
import { CardInfosComponent } from './components/molecules/card-infos/card-infos.component';
import { TagsComponent } from './components/atoms/tags/tags.component';
import { IconsComponent } from './components/atoms/icons/icons.component';
import { PaginationComponent } from './components/molecules/pagination/pagination.component';
import { ModalComponent } from './components/molecules/modal/modal.component';
import { NotifComponent } from './components/atoms/notif/notif.component';
import { TranslatePipe } from './pipes/translate.pipe';
@NgModule({
  declarations: [
    InputComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    SelectComponent,
    HeaderComponent,
    InputSearchComponent,
    CardInfosComponent,
    TagsComponent,
    IconsComponent,
    PaginationComponent,
    ModalComponent,
    NotifComponent,
    TranslatePipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    CheckboxGroupComponent,
    HeaderComponent,
    InputSearchComponent,
    CardInfosComponent,
    TagsComponent,
    IconsComponent,
    PaginationComponent,
    ModalComponent,
    SelectComponent,
    TranslatePipe,
  ],
})
export class SharedModule {}
