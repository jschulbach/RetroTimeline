import { Component, ElementRef, OnInit } from '@angular/core';
import { timelineItem } from './timelineItem'
import { Base } from '../models/Base';


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public startDate = new Date("1970");
  public endDate = new Date("2023");
  public yearWidth: number = 0;
  public itemTypes: string[] = [];
  public years = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975]
  public groupColors = ['red', 'blue', 'green', 'orange', 'purple']
  public items: timelineItem[] = [
    {display: false, metaData: {name: "Intel 8080", type: "CPU"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1974"), endDate:new Date("1-1-1990"), width: 0},
    {display: false, metaData: {name: "MOS 6502", type: "CPU"}, leftPos: 0, topPos: 0, startDate:new Date("1-1-1975"), endDate:new Date("1-1-2010"), width: 0},
    {display: false, metaData: {name: "Intel 286", type: "CPU"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1982"), endDate:new Date("1-1-1991"), width: 0},
    {display: false, metaData: {name: "Intel 386", type: "CPU"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1985"), endDate:new Date("1-1-2007"), width: 0},
    {display: false, metaData: {name: "Intel 486", type: "CPU"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1989"), endDate:new Date("1-1-2007"), width: 0},
    {display: false, metaData: {name: "486bx2", type: "Motherboard"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1989"), width: 0},
    {display: false, metaData: {name: "Commodore 64", type: "Computer"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1982"), endDate:new Date("1-1-1994"), width: 0},
    {display: false, metaData: {name: "Nabu", type: "Computer"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1982"), endDate:new Date("1-1-1985"), width: 0},
    {display: false, metaData: {name: "Voodoo 2", type: "Video Card"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1998")},
    {display: false, metaData: {name: "DDR", type: "Tech Standard"},leftPos: 0,topPos: 0, startDate:new Date("1-1-1998")},
    {display: false, metaData: {name: "DDR2", type: "Tech Standard"},leftPos: 0,topPos: 0, startDate:new Date("1-1-2003")},
    {display: false, metaData: {name: "DDR3", type: "Tech Standard"},leftPos: 0,topPos: 0, startDate:new Date("1-1-2007")},];
  public displayItems: {[k: string]: timelineItem[]} = {};
  displayedColumns: string[] = ['display', 'name', 'start', 'end'];
  dataSource = this.items;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
    let years = timeDiff / (1000 * 3600 * 24 * 365);
    this.yearWidth = Math.floor((this.el.nativeElement.offsetWidth - 20) / years);
    this.populateItemTypes();
    this.items = this.updateItems(this.items);
  }

  populateItemTypes() {
    this.items.forEach(item => {
      if(!this.itemTypes.includes(item.metaData.type)) {
        this.itemTypes.push(item.metaData.type);
        this.displayItems[item.metaData.type] = [];
      }
    });
  }

  updateItems(items: any) {
    this.clearDisplayItems();
    this.items.forEach(item => {
      if(item.display) {
        let years = Math.floor((item.startDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24 * 365));
        item.leftPos = years * this.yearWidth;
        item.topPos = this.displayItems[item.metaData.type].length * 25;
        if(item.endDate)
          item.width = Math.floor((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 3600 * 24 * 365)) * this.yearWidth;
        //top+=30;
        this.displayItems[item.metaData.type].push(item);
      }
    });
    return items;
  }

  clearDisplayItems() {
    for(const k in this.displayItems) {
      this.displayItems[k] = [];
    }
  }

  toggleItem(item: any) {
    item.display = !item.display;
    this.updateItems(this.items);
  } 

}

import { Pipe, PipeTransform } from '@angular/core';

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
        
        var itemlist =  items.filter(item => item.metaData.type == filter );
        return itemlist;
    }
}


