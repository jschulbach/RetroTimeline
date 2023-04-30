import { Component, Input, OnInit } from '@angular/core';
import { timelineItem } from '../timeline/timelineItem';
import {MatDialog} from '@angular/material/dialog';
import { ItemDetailDialogComponent } from '../timeline/item-detail-dialog/item-detail-dialog.component';

@Component({
  selector: 'timeline-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: timelineItem | undefined;
  @Input() color = "red";
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ItemDetailDialogComponent, {data: this.item});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
