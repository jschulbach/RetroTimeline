import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timelineItem } from '../timelineItem';
@Component({
  selector: 'app-item-detail-dialog',
  templateUrl: './item-detail-dialog.component.html',
  styleUrls: ['./item-detail-dialog.component.scss']
})
export class ItemDetailDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public item: timelineItem) { }

  ngOnInit(): void {
  }

}
