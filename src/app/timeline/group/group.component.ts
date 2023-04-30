import { Component, Input, OnInit } from '@angular/core';
import { timelineItem } from '../timelineItem';

@Component({
  selector: 'timeline-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() items: timelineItem[] = [];
  @Input() color: string = "red";

  constructor() { }

  ngOnInit(): void {
  }

}
