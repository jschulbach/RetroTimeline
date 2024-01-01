import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timelineItem } from '../timelineItem';
import {MatDialog} from '@angular/material/dialog';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'timeline-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item!: timelineItem;
  @Output() handleClick = new EventEmitter
  public icon:string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    switch(this.item.metaData.type as Category) {
      case Category.CPU :
      case Category.Memory :
        this.icon = 'memory';
        break;
      case Category.Computer:
        this.icon = 'computer';
        break;
      default:
    }
  }

  openDialog() {
    this.handleClick.emit(this.item.metaData.id)
    // const dialogRef = this.dialog.open(ItemDetailDialogComponent, {data: this.item?.metaData, position: {top: '30px'}});

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
