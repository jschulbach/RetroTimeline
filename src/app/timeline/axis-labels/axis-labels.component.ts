import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'timeline-axis-labels',
  templateUrl: './axis-labels.component.html',
  styleUrls: ['./axis-labels.component.scss']
})
export class AxisLabelsComponent implements OnInit {

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();

  public yearWidth: number = 0;
  public labels: string[] = [];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.populateLabels();
  }
  populateLabels() {
    let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
    let years = timeDiff / (1000 * 3600 * 24 * 365);
    for(let i = 0; i < years; i++) {
      let year = this.startDate.getFullYear() + i;
      if(!(year%5))
        this.labels.push(String(year))
    }
    this.yearWidth = Math.floor(this.el.nativeElement.offsetWidth / years) * 5;
  }

}
