import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-detail',
  standalone: true,
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent {

@Input() itemDetail: any;

}
