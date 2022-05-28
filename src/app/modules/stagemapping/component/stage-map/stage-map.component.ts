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
      let x = this.cards.find(x => x.stages.find(y => y == this.dragData))
      let i = x.stages.findIndex(y => y == this.dragData)
      x.stages.splice(i, 1)
      let val = this.cards.length - 1
      let y = this.cards.findIndex(x => x.stages.length == 0)
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
      
      this.cards.forEach((x, index) => {
     
        let i = index
        let item = this.mapData.find(x => x.stage_id)
        if (i == event.currentIndex) {
          x.stages.splice(event.currentIndex, 0, item)
          x.stages.length > 1 ? null : this.cardPush()
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
      stages: []
    }
    this.cards.push(req)
  }

  cutStage(temp) {
    let i = this.cards.filter(x => x.stages)
    let j = i.find(y => y.stages.find(z => z == temp))
    let k = j.stages.findIndex(e => e == temp)
    j.stages.splice(k, 1)
    this.cards.forEach((x, index) => {
      if (x.stages.length == 0) {
        this.cards.splice(index, 1)
        let val = this.cards.length - 1
        this.cards[val].stages.length == 0 ? null : this.cardPush()
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
