import { Component, ElementRef, OnInit } from '@angular/core';
import { timelineItem } from './timelineItem'
import { Base } from '../models/Base';


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public startYear = "1970";
  public startDate = new Date(this.startYear);
  public endDate = new Date("2023");
  public yearWidth: number = 0;
  public itemTypes: string[] = [];
  public displayEmpty = true;
  public sourceList: Base[] = [
    {name: "Intel 8080", type: Category.CPU, releaseDate: "1974-01-01T00:00", endOfLifeDate: "1990-01-01T00:00"},
    {name: "MOS 6502", type: Category.CPU, releaseDate: "1975-01-01T00:00", endOfLifeDate: "2010-01-01T00:00"},
    {name: "Intel 286", type: Category.CPU, releaseDate: "1982-01-01T00:00", endOfLifeDate: "1991-01-01T00:00"},
    {name: "Intel 386", type: Category.CPU, releaseDate: "1985-01-01T00:00", endOfLifeDate: "2007-01-01T00:00"},
    {name: "Intel 486", type: Category.CPU, releaseDate: "1989-01-01T00:00", endOfLifeDate: "2007-01-01T00:00"},
    {name: "486bx2", type: Category.Motherboard, releaseDate: "1989-01-01T00:00"},
    {name: "Commodore 64", type: Category.Computer, releaseDate: "1982-01-01T00:00", endOfLifeDate: "1994-01-01T00:00"},
    {name: "Nabu", type: Category.Computer, releaseDate: "1982-01-01T00:00", endOfLifeDate: "1985-01-01T00:00"},
    {name: "Voodoo 2", type: Category.VideoCard, releaseDate: "1998-01-01T00:00"},
    {name: "DDR", type: Category.Memory, releaseDate: "1998-01-01T00:00"},
    {name: "DDR2", type: Category.Memory, releaseDate: "2003-01-01T00:00"},
    {name: "DDR3", type: Category.Memory, releaseDate: "2007-01-01T00:00"},
    {name: "Sound Blaster 1.0", type: Category.SoundCard, releaseDate: "1989-01-01T00:00"},
    {name: "Sound Blaster 1.5", type: Category.SoundCard, releaseDate: "1990-01-01T00:00"}
  ]
  public items: timelineItem[] = [];
  public displayItems: {[k: string]: timelineItem[]} = {};
  displayedColumns: string[] = ['display', 'name', 'start', 'end'];
  dataSource = this.items;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
    let years = timeDiff / (1000 * 3600 * 24 * 365);
    this.yearWidth = Math.floor((this.el.nativeElement.offsetWidth - 20) / years);
    this.populateItems();
    this.populateItemTypes();
    this.items = this.updateItems(this.items);
  }
  populateItems() { 
    this.sourceList.forEach(item => this.items.push({display: false, leftPos: 0, topPos: 0, width: 0, metaData: item}))
  }

  populateItemTypes() {
    this.items.forEach(item => {
      console.log(item.metaData.type, Category[item.metaData.type])
      if(!this.itemTypes.includes(Category[item.metaData.type])) {
        this.itemTypes.push(Category[item.metaData.type]);
        this.displayItems[Category[item.metaData.type]] = [];
      }
    });
  }

  updateRange(input: string) {
    this.startDate = new Date(input);
    this.ngOnInit();
  }

  updateItems(items: any) {
    this.clearDisplayItems();
    this.items.forEach(item => {
      if(item.display) {
        let years = Math.floor((new Date(item.metaData.releaseDate).getTime() - this.startDate.getTime()) / (1000 * 3600 * 24 * 365));
        item.leftPos = years * this.yearWidth;
        item.topPos = this.displayItems[Category[item.metaData.type]].length * 25;
        if(item.metaData.endOfLifeDate)
          item.width = Math.floor((new Date(item.metaData.endOfLifeDate).getTime() - new Date(item.metaData.releaseDate).getTime()) / (1000 * 3600 * 24 * 365)) * this.yearWidth;
        this.displayItems[Category[item.metaData.type]].push(item);
        this.displayEmpty = false;
      }
    });
    return items;
  }

  clearDisplayItems() {
    for(const k in this.displayItems) {
      this.displayItems[k] = [];
    }
    this.displayEmpty = true;
  }

  toggleItem(item: any) {
    item.display = !item.display;
    this.updateItems(this.items);
  } 

}

import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.enum';

@Pipe({
    name: 'typefilter',
    pure: false
})
export class TypeFilterPipe implements PipeTransform {
    transform(items: any[], filter: String): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        
        var itemlist =  items.filter(item => item.metaData.type == Category[filter as keyof typeof Category] );
        return itemlist;
    }
}


