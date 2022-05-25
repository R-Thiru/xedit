import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { stages, stagesData } from 'app/modules/stages/component/stages-list/stages.model';
import { lowerFirst } from 'lodash';
import { StagemappingService } from '../../stagemapping.service';
import { card, cardsData, processData, templateData } from './stage-map.model';

@Component({
  selector: 'stage-map',
  templateUrl: './stage-map.component.html',
  styleUrls: ['./stage-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageMapComponent implements OnInit {

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  stageData = processData
  cards: card[] = cardsData;
  templateData = templateData;
  mapData: any = []
  index: any

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              private router:Router,
              private stageService:StagemappingService) { }

  ngOnInit(): void {

  }

  dragData: any
  drop(event) {
    
    if (event.previousContainer === event.container) {
      event.currentIndex = this.dropIndex
      event.container.data[0] = this.dragData
      let x = this.cards.find(x => x.mapDatas.find(y => y == this.dragData))
      let i = x.mapDatas.findIndex(y => y == this.dragData)
      x.mapDatas.splice(i, 1)
      let val = this.cards.length - 1
      let y = this.cards.findIndex(x => x.mapDatas.length == 0)
      y == val ? null : this.cards.splice(y, 1)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.currentIndex = this.dropIndex
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }
    if (this.mapData) {
      console.log('this.mapData',this.mapData);
      
      this.cards.forEach((x, index) => {
     
        let i = index
        let item = this.mapData.find(x => x.stage_id)
        if (i == event.currentIndex) {
          x.mapDatas.splice(event.currentIndex, 0, item)
          x.mapDatas.length > 1 ? null : this.cardPush()
          this.mapData = []
        }
      });
    }
   
  }

  getData(map) {
    this.dragData = map
  }

  cardPush() {
    let req = {
      uuid: 2,
      mapDatas: []
    }
    this.cards.push(req)
  }

  cutStage(temp) {
    let i = this.cards.filter(x => x.mapDatas)
    let j = i.find(y => y.mapDatas.find(z => z == temp))
    let k = j.mapDatas.findIndex(e => e == temp)
    j.mapDatas.splice(k, 1)
    this.cards.forEach((x, index) => {
      if (x.mapDatas.length == 0) {
        this.cards.splice(index, 1)
        let val = this.cards.length - 1
        this.cards[val].mapDatas.length == 0 ? null : this.cardPush()
      }
    })

    this.stageData.unshift(temp)
    this._changeDetectorRef.detectChanges()
  }

  dropIndex: any
  dropped(i) {
    this.dropIndex = i
  }

  nextStage(){
    this.stageService.projectSelected.next(this.cards)
    this.router.navigateByUrl('/stagemapping/processmap')
  }

}
