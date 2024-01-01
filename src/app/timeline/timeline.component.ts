import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { timelineItem } from './timelineItem'
import { Base } from '../models/Base';
import { ItemService } from '../../item.service';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { ItemDetailComponent } from './item-detail/item-detail.component';

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
  private yearWidthSubject: BehaviorSubject<string> = new BehaviorSubject("50");
  public yearWidth: number = 50;
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
    this.getYearWidth().subscribe(w => {
      this.yearWidth = +w;
      this.updateItems(this.items);
    });
  }
  
  setupDateRange() {
    this.getStartYear().subscribe(y => {
      this.startDate = new Date(y);
      let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
      let years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      this.updateItems(this.items); 
    });
          
    this.getEndYear().subscribe(y => {
      this.endDate = new Date(y);
      let timeDiff = this.endDate.getTime() - this.startDate.getTime(); 
      let years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      console.log('years: ', years)
      console.log('timeline width: ', this.el.nativeElement.offsetWidth)
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

  setYearWidth(event: Event) {
    this.yearWidthSubject.next((event.target as HTMLInputElement).value);
  }

  getEndYear(): Observable<string> {
    return this.endYearSubject.asObservable();
  }

  getYearWidth(): Observable<string> {
    return this.yearWidthSubject.asObservable();
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
        let years = Math.floor((Date.parse(item.metaData.releaseDate) - this.startDate.getTime()) / (1000 * 3600 * 24 * 365));
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
    this.allDisplayedForType[type] = completed;
    this.items.forEach(item => {
      if(item.metaData.type === type) 
        item.display = completed;
    })
    this.updateItems(this.items);
  }

  public itemDetails: any;

  openSideDrawer(event: Event) {
    console.log('got a click for', event)
    this.itemService.getItem('computer', event).subscribe((i: any) => {
      this.itemDetails = i;
      if(this.drawer)
        this.drawer.toggle()
    })
    
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


