import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LignePageRoutingModule } from './ligne-routing.module';

import { LignePage } from './ligne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LignePageRoutingModule
  ],
  declarations: [LignePage]
})
export class LignePageModule {}
