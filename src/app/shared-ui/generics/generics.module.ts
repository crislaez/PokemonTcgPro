import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TypesModule } from '@pokemonTcgApp/shared/types/types.module';
import { CardModalComponent } from './components/card-modal.component';
import { FilterModalComponent } from './components/filter-modal.component';


@NgModule({
  declarations: [
    CardModalComponent,
    FilterModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TypesModule,
    TranslateModule.forChild()
  ],
  exports:[
    CardModalComponent,
    FilterModalComponent
  ]
})
export class GenericsModule { }
