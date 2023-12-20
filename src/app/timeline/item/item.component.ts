import { Component, Input, OnInit } from '@angular/core';
import { timelineItem } from '../timelineItem';
import {MatDialog} from '@angular/material/dialog';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';

@Component({
  selector: 'timeline-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: timelineItem | undefined;
  @Input() category = 1;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ItemDetailDialogComponent, {data: this.item?.metaData, position: {top: '30px'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
