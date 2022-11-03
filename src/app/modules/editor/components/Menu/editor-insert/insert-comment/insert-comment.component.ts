import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditorService } from 'app/modules/editor/editor.service';
import { UserService } from 'app/modules/user/user.service';

// import customEditor from 'assets/buil_custom/build/ckeditor';
import customEditor from 'assets/super_build/build/ckeditor';


@Component({
  selector: 'insert-comment',
  templateUrl: './insert-comment.component.html',
  styleUrls: ['./insert-comment.component.scss']
})
export class InsertCommentComponent implements OnInit {
  public Editor = customEditor.Editor;

  commentForm: FormGroup
  Roles: any = [];
  Team: any = [];
  User: any = [];
  commentConfig :any = {
    toolbar: ['xeditbold', 'xedititalic', 'xeditsubscript', 'xeditsuperscript','xeditstrikethrough']
  };

  constructor(private _builder: FormBuilder,
    private _userService: UserService,
    private _editorService: EditorService) { }

  ngOnInit(): void {
    this._userService.getTeams().subscribe(result => {
      this.Team = result.data
    });

    this._userService.getUsers().subscribe(result => {

      this.User = result.data

    })

    this.commentForm = this._builder.group({
      comment: [''],
      select_line: [''],
      select_role: [''],
      select_team: [''],
      select_user: ['']
    })

    // this.commentForm.get('comment').valueChanges.subscribe(res => {
    //   console.log(res);
    // })
  }

  submitInsertComment() {
    console.log( 'submitcomment', this.commentForm );
    this._editorService.commentData.next( this.commentForm.value.comment )
  }

  getSelectTeam(team) {
    let a = this.Team.find(x => x.uuid == team)
    let req = {
      team_uuid: a.uuid
    }
    this._userService.getRolesAsTeam(req).subscribe(result => {
      this.Roles = result.data
    })
  }

  editorReady(editor) {

  }



}
