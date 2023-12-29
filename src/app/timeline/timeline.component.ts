import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timelineItem } from './timelineItem'
import { Base } from '../models/Base';
import { ItemService } from '../../item.service';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  private startYearSubject: BehaviorSubject<string> = new BehaviorSubject("1970");
  public startDate = new Date();
  private endYearSubject: BehaviorSubject<string> = new BehaviorSubject("2023");
  public endDate = new Date();
  public yearWidth: number = 0;
  public itemTypes: string[] = [];
  public displayEmpty = true;
  public sourceList: Base[] = [];
  public items: timelineItem[] = [];
  public displayItems: {[k: string]: timelineItem[]} = {};
  displayedColumns: string[] = ['display', 'name', 'start', 'end'];
  dataSource = this.items;
  public allDisplayedForType: any = {
    computer: false
  }
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;
  @ViewChild(MatDrawer) drawer: MatDrawer | undefined;

  constructor(private el: ElementRef, private itemService: ItemService) {}

  ngOnInit(): void {
    this.setupDateRange();
    this.getItems(); 
    
  }
  
  setupDateRange() {
    this.getStartYear().subscribe(y => {
      this.startDate = new Date(y);
      let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
      let years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      this.yearWidth = Math.round((this.el.nativeElement.offsetWidth) / years);
      this.updateItems(this.items); 
    });
          
    this.getEndYear().subscribe(y => {
      this.endDate = new Date(y);
      let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
      let years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      console.log('years: ', years)
      console.log('timeline width: ', this.el.nativeElement.offsetWidth)
      this.yearWidth = Math.round((this.el.nativeElement.offsetWidth) / years);
      console.log(this.yearWidth)
      this.updateItems(this.items);
    });
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.sourceList = items
      this.populateItems();
      this.populateItemTypes();
      this.items = this.updateItems(this.items);
      if(this.tabGroup)
        this.tabGroup.selectedIndex = 1;
    });
  }

  getStartYear(): Observable<string> {
    return this.startYearSubject.asObservable();
  }

  setStartYear(event: Event) {
    this.startYearSubject.next((event.target as HTMLInputElement).value);
  }

  getEndYear(): Observable<string> {
    return this.endYearSubject.asObservable();
  }

  setEndYear(event: Event) {

    this.endYearSubject.next((event.target as HTMLInputElement).value);
  }
  
  populateItems() { 
    this.sourceList.forEach(item => this.items.push({display: false, leftPos: 0, topPos: 0, width: 0, metaData: item}))
  }

  populateItemTypes() {
    this.items.forEach(item => {
      if(!this.itemTypes.includes(Category[item.metaData.type])) {
        this.itemTypes.push(Category[item.metaData.type]);
        this.displayItems[Category[item.metaData.type]] = [];
      }
    });
  }

  updateItems(items: any) {
    this.clearDisplayItems();
    this.items.forEach(item => {
      if(item.display) {
        console.log("found one to display")
        let years = Math.floor((new Date(item.metaData.releaseDate).getTime() - this.startDate.getTime()) / (1000 * 3600 * 24 * 365));
        console.log(years, item.metaData.releaseDate, this.startDate)
        console.log("settign left for item to ", years, this.yearWidth, years * this.yearWidth)
        item.leftPos = years * this.yearWidth + (Math.round(new Date(item.metaData.releaseDate).getMonth() * this.yearWidth/12));
        item.topPos = this.displayItems[Category[item.metaData.type]].length * 35;
        if(item.metaData.endOfLifeDate)
          item.width = Math.floor((new Date(item.metaData.endOfLifeDate).getTime() - new Date(item.metaData.releaseDate).getTime()) / (1000 * 3600 * 24 * 365)) * this.yearWidth;
        this.displayItems[Category[item.metaData.type]].push(item);
        this.displayEmpty = false;
      }
    });
    return items;
  }

  someDisplayed(category: string): boolean {
    if (this.items == null) {
      return false;
    }
    console.log(category , this.items.filter(i => i.metaData.type == category && i.display).length)
    var selectedItemsCount = this.items.filter(i => i.metaData.type == category && i.display).length;
    return selectedItemsCount > 0 && selectedItemsCount < this.items.filter(i => i.metaData.type == category).length;
  }

  allDisplayed(category: string): boolean {
    return this.items.filter(i => i.metaData.type == category && i.display).length == this.items.filter(i => i.metaData.type).length;
  }

  clearDisplayItems() {
    for(const k in this.displayItems) {
      this.displayItems[k] = [];
    }
    this.displayEmpty = true;
  }

  toggleItem(displayItem: any) {
    console.log("toggle one", displayItem.display)
    var masterItem = this.items.find((item) => displayItem.metaData.id == item.metaData.id)
    if(masterItem) {
      masterItem.display = !masterItem.display;
      displayItem.display = !displayItem.display;
    }
    this.updateItems(this.items);
  }

  toggleDisplay(completed: boolean, type: string) {
    console.log("toggle all")
    this.allDisplayedForType[type] = completed;
    this.items.forEach(item => {
      if(item.metaData.type === type) 
        item.display = completed;
    })
    this.updateItems(this.items);
  }

  openSideDrawer(event: Event) {
    if(this.drawer)
      this.drawer.toggle()
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

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


