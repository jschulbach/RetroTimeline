import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Base } from './app/models/Base';
import { Category } from './app/models/category.enum';
import { Observable, forkJoin, from, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private types = ['computer', 'cpu', 'memory', 'motherboard', 'soundcard', 'videocard', 'os'];

  constructor(private httpClient: HttpClient) { }

  getItemsFile = (type: string) => {
    return this.httpClient.get(`../../assets/${type}/items.json`) as Observable<Base[]>;
  }

  getItems2(): any {
    return from(this.types).pipe(mergeMap(arr => forkJoin([this.getItemsFile(arr)])));
  }

  // getItems(): Observable<Base[]> {
  //   let computer = this.httpClient.get('../../assets/computer/items.json') as Observable<Base[]>;
  //   let cpu = this.httpClient.get('../../assets/cpu/items.json') as Observable<Base[]>;
  //   let memory = this.httpClient.get('../../assets/memory/items.json') as Observable<Base[]>;
  //   let motherboard = this.httpClient.get('../../assets/motherboard/items.json') as Observable<Base[]>;
  //   let soundcard = this.httpClient.get('../../assets/soundcard/items.json') as Observable<Base[]>;
  //   let videocard = this.httpClient.get('../../assets/videocard/items.json') as Observable<Base[]>;
  //   let os = this.httpClient.get('../../assets/os/items.json') as Observable<Base[]>;
  //   let allItems: Base[] = [];
  //   return forkJoin([computer, cpu, memory, motherboard, soundcard, videocard, os]).pipe(map((n) => {
      
  //     n.forEach(t => {
  //       t.forEach()
  //       allItems = allItems.concat(t);
  //       console.log(allItems)
  //     })
  //     console.log(allItems)
  //     return allItems
  //   }));
  // }

  getItems(): Observable<Base[]> {
    let computer = this.httpClient.get('../../assets/computer/items.json') as Observable<Base[]>;
    let cpu = this.httpClient.get('../../assets/cpu/items.json') as Observable<Base[]>;
    let memory = this.httpClient.get('../../assets/memory/items.json') as Observable<Base[]>;
    let motherboard = this.httpClient.get('../../assets/motherboard/items.json') as Observable<Base[]>;
    let soundcard = this.httpClient.get('../../assets/soundcard/items.json') as Observable<Base[]>;
    let videocard = this.httpClient.get('../../assets/videocard/items.json') as Observable<Base[]>;
    let os = this.httpClient.get('../../assets/os/items.json') as Observable<Base[]>;
    //this.getItems2().subscribe((n: any) => console.log(n));
    return forkJoin([computer, cpu, memory, motherboard, soundcard, videocard, os]).pipe(map(([computer, cpu, memory, motherboard, soundcard, videocard, os]) => {
      computer = this.setTypeAndReturn(computer, Category.Computer);
      cpu = this.setTypeAndReturn(cpu, Category.CPU);
      memory = this.setTypeAndReturn(memory, Category.Memory);
      motherboard = this.setTypeAndReturn(motherboard, Category.Motherboard);
      soundcard = this.setTypeAndReturn(soundcard, Category.SoundCard);
      videocard = this.setTypeAndReturn(videocard, Category.VideoCard);
      os = this.setTypeAndReturn(os, Category.OS);
      return [...computer,...cpu, ...memory, ...motherboard, ...soundcard, ...videocard, ...os]
    }));
  }

  setTypeAndReturn(item: Base[], type: Category) {
    return item.map((i: any) => {
      i.type = type;
      return i;
    });
  }

  getItem(type: string, id:Event): any {
    return this.httpClient.get(`../../assets/${type}/${id}/item.json`) as any;
  }
}
