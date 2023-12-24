import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Base } from './app/models/Base';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Base[]> {
    let computer = this.httpClient.get('../../assets/computer/items.json') as Observable<Base[]>;
    let cpu = this.httpClient.get('../../assets/cpu/items.json') as Observable<Base[]>;
    let memory = this.httpClient.get('../../assets/memory/items.json') as Observable<Base[]>;
    let motherboard = this.httpClient.get('../../assets/motherboard/items.json') as Observable<Base[]>;
    let soundcard = this.httpClient.get('../../assets/soundcard/items.json') as Observable<Base[]>;
    let videocard = this.httpClient.get('../../assets/videocard/items.json') as Observable<Base[]>;
    let os = this.httpClient.get('../../assets/os/items.json') as Observable<Base[]>;
    return forkJoin([computer, cpu, memory, motherboard, soundcard, videocard, os]).pipe(map(([computer, cpu, memory, motherboard, soundcard, videocard, os]) => {
      return [...computer,...cpu, ...memory, ...motherboard, ...soundcard, ...videocard, ...os]
    }));
  }
}
