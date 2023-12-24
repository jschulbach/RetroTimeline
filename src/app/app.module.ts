import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent, TypeFilterPipe } from './timeline/timeline.component';
import { GroupComponent } from './timeline/group/group.component';
import { AxisLabelsComponent } from './timeline/axis-labels/axis-labels.component';
import { ItemComponent } from './timeline/item/item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTableModule} from '@angular/material/table';
import { ItemDetailDialogComponent } from './timeline/item-detail-dialog/item-detail-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TypeFilterPipe,
    TimelineComponent,
    GroupComponent,
    AxisLabelsComponent,
    ItemComponent,
    ItemDetailDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    //MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [/*MatDatepickerModule*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
