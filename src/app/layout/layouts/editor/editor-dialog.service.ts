import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Note } from './editor-dialog.types';

@Injectable({
  providedIn: 'root'
})
export class EditorDialogService {

  constructor(private _httpClient: HttpClient) { }



     /**
     * Get note by id
     */
      getNoteById(id: string): Observable<Note>
      {
          return this._notes.pipe(
              take(1),
              map((notes) => {
  
                  // Find within the folders and files
                  const note = notes.find(value => value.id === id) || null;
  
                  // Update the note
                  this._note.next(note);
  
                  // Return the note
                  return note;
              }),
              switchMap((note) => {
  
                  if ( !note )
                  {
                      return throwError('Could not found the note with id of ' + id + '!');
                  }
  
                  return of(note);
              })
          );
      }
   /**
     * Create note
     *
     * @param note
     */
    createNote(note: Note): Observable<Note>
    {
        return this._httpClient.post<Note>('api/apps/notes', {note}).pipe(
            switchMap(response => this.getNotes().pipe(
                switchMap(() => this.getNoteById(response.id).pipe(
                    map(() => response)
                ))
            )));
    }
}
