import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../projects.service';


@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private prjctServcie: ProjectsService,
    private _fuseMediaWatcherService: FuseMediaWatcherService) { }


  @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  currentName: any
  currentproject: number = 0;
  selectedProject: any
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  projectsData = [
    {
      "stage_name": "PAT",
      "stage_uuid": "6507668a-05bd-11e9-b4e7-42010a800002",
      "default_order": 0,
      "mapped_stage_uuid": "f80533b4-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "Pre-Editing",
      "stage_uuid": "6c272762-05bd-11e9-b4e7-42010a800002",
      "default_order": 1,
      "mapped_stage_uuid": "f807a201-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "Copy Editing",
      "stage_uuid": "73800760-05bd-11e9-b4e7-42010a800002",
      "default_order": 2,
      "mapped_stage_uuid": "f809e1c6-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "Typesetting",
      "stage_uuid": "784185be-05bd-11e9-b4e7-42010a800002",
      "default_order": 3,
      "mapped_stage_uuid": "f80c2ddb-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "PE Review",
      "stage_uuid": "f9eb22b2-7ee2-11e9-8229-42010a800002",
      "default_order": 4,
      "mapped_stage_uuid": "f810aa3d-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "AU Review",
      "stage_uuid": "03e4bb21-7ee3-11e9-8229-42010a800002",
      "default_order": 5,
      "mapped_stage_uuid": "f812e429-bfdb-11ec-b908-002590e66074",
      "count": 0
    },
    {
      "stage_name": "1st Revises",
      "stage_uuid": "33247cb6-9a44-11e9-912a-42010a800002",
      "default_order": 6,
      "mapped_stage_uuid": "f8153b6c-bfdb-11ec-b908-002590e66074",
      "count": 0
    }
  ]
  ngOnInit(): void {

    this.prjctServcie.projectSelected.subscribe((res) => {
      this.selectedProject = res
    })
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
  }


  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  goToStep(step: number): void {
    // Set the current step

    this.currentproject = step;

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
    if (this.currentproject === this.projectsData.length - 1) {
      return;
    }

    // Go to step
    this.goToStep(this.currentproject + 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
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
}
