import { copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { elementAt, Subject, takeUntil } from 'rxjs';
import { StagemappingService } from '../../stagemapping.service';
import { cardsData, processCard, processCardsData, processData } from '../stage-map/stage-map.model';

@Component({
  selector: 'process-map',
  templateUrl: './process-map.component.html',
  styleUrls: ['./process-map.component.scss']
})
export class ProcessMapComponent implements OnInit {
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  stagedData: any = []
  mapData: any = []
  process: any = []
  mappedData: any = []
  cards: processCard[] = processCardsData;
  dragData: any
  dropIndex: any
  currentproject: number = 0;
  processData = processData
  @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private stageService: StagemappingService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    this.stageService.projectSelected.subscribe(res => {
      this.stagedData = res
      this.stagedData = this.stagedData.filter(x => x.stages.length > 0)
    })
    console.log('this.stagedData', this.stagedData);

    this.stagedData.forEach(x => {
      if (x.stages.length > 0) {
        x.stages.forEach(y => {
          this.mapData.push(y)
        })

      }
    })

    this.mapData.forEach(x => {
      if (!x.selectedProcess) {
        x.selectedProcess = [{
          stages: []
        }]
      }
      let i = this.stagedData.findIndex(y => y.stages.includes(x))
      x.i = i
      this.process.push(x.process)
    })

    console.log(this.mapData);
    
  }


  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  goToStep(i) {
    // Set the current step

    this.currentproject = i;

    // Go to the step
    this.courseSteps.selectedIndex = this.currentproject

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
     * Go to previous step
     */
  goToPreviousStep(): void {

    // Return if we already on the first step
    if (this.currentproject === 0) {
      return;
    }

    // Go to step
    this.goToStep(this.currentproject - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();


  }

  /**
   * Go to next step
   */
  goToNextStep(): void {

    // Return if we already on the last step
    if (this.currentproject === this.mapData.length - 1) {
      return;
    }

    // Go to step
    this.goToStep(this.currentproject + 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
    // this.cards = []
    // this.cardPush()
  }


  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {

      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  getData(map) {
    this.dragData = map
  }

  obj: any
  arr = []
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
    }
    else {
      event.currentIndex = this.dropIndex

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }


    // dropMapping
    if (this.mappedData) {
      this.obj = this.mappedData[0]
      this.mapData.forEach((x, index) => {
        let item = this.mappedData.find(x => x.process_id)
          if(index == this.currentproject){
            x.selectedProcess.forEach((e,index) => {
              if(index == event.currentIndex){
                e.stages.splice(event.currentIndex, 0, item) 
                e.stages.length > 1 ? null : this.cardPush() 
              }  
            })
          this.mappedData = []
          }
      });
    }
    console.log(this.mapData);
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

    this.process.unshift(temp)
    this._changeDetectorRef.detectChanges()
  }


  dropped(i) {
    this.dropIndex = i
  }

  cardPush() {

    let req = {
      stages: []
    }
    this.mapData.forEach((element,index) => {
      if(index == this.currentproject){
        element.selectedProcess.push(req)
      }
      
    });
    
  }





}
