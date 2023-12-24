import { Component, Input, OnInit } from '@angular/core';
import { timelineItem } from '../timelineItem';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'timeline-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() items: timelineItem[] = [];
  @Input() category: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('group got items', this.items)
  }

}
