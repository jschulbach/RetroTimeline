import { Component, Input, OnInit } from '@angular/core';
import { timelineItem } from '../timelineItem';

@Component({
  selector: 'timeline-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() items: timelineItem[] = [];
  @Input() category: number = 1;

  constructor() { }

  ngOnInit(): void {
    console.log('group got items', this.items)
  }

}
