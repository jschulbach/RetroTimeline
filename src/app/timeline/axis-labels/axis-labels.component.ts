import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'timeline-axis-labels',
  templateUrl: './axis-labels.component.html',
  styleUrls: ['./axis-labels.component.scss']
})
export class AxisLabelsComponent implements OnInit {

  @Input() startDateInput: Observable<string> = of('');
  @Input() endDateInput: Observable<string> = of('');
  public startDate = new Date();
  public endDate = new Date();

  public yearWidth: number = 0;
  public labels: string[] = [];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.startDateInput.subscribe(y => {
      this.labels = [];
      this.startDate = new Date(y);
      this.populateLabels();
    });
    this.endDateInput.subscribe(y => {
      this.labels = [];
      this.endDate = new Date(y);
      this.populateLabels();
    });
    
  }
  populateLabels() {
    let timeDiff = this.endDate.getTime() - this.startDate.getTime();
    console.log('axis ', this.endDate.getDate(), )
    let years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    for(let i = 1; i <= years; i++) {
      let year = this.startDate.getFullYear() + i;
      //if(!(year%5))
        this.labels.push(String(year).substring(2))
      
    }
    this.yearWidth = Math.round(this.el.nativeElement.offsetWidth / years);
    console.log(years, this.yearWidth)
  }

}
