import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _NoteService: NoteService
  ) {}

  ngOnInit(): void {
    this.getAllUserNotes();
  }

  addNewNoteForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(25),
    ]),
  });

  editNoteForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(25),
    ]),
  });

  addNote() {
    let x = {
      title: this.addNewNoteForm.value.title,
      desc: this.addNewNoteForm.value.desc,
      userID: this._AuthService.currentUser.getValue()._id,
      token: localStorage.getItem('myToken'),
    };
    this._NoteService.addNoteService(x).subscribe(
      (res) => {
        if (res.message == 'success') {
          (<HTMLElement>document.querySelector('.succ')).style.top = '85%';
          setTimeout(() => {
            (<HTMLElement>document.querySelector('.succ')).style.top = '110%';
            this.resetValue();
            this.getAllUserNotes();
          }, 2000);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editID: string = '';
  editNote() {
    let obj = {
      title: this.editNoteForm.value.title,
      desc: this.editNoteForm.value.desc,
      NoteID: this.editID,
      token: <string>localStorage.getItem('myToken'),
    };
    this._NoteService.updateNote(obj).subscribe(
      (res) => {
        if (res.message == 'updated') {
          this.getAllUserNotes();
          $('#editNote').modal('hide');
          this.resetValue();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  callEdit(id: string) {
    for (let i = 0; i < this.allUserNotes.length; i++) {
      if (this.allUserNotes[i]._id == id) {
        this.editNoteForm.controls['title'].setValue(
          this.allUserNotes[i].title
        );
        this.editNoteForm.controls['desc'].setValue(this.allUserNotes[i].desc);
        break;
      }
    }

    $('#editNote').modal('show');
    this.editID = id;
  }

  resetValue() {
    this.addNewNoteForm.reset();
    $('#addNote').modal('hide');
  }

  allUserNotes: any[] = [];
  errMsg: string = '';
  getAllUserNotes() {
    this._NoteService.getAllUsersNotes().subscribe(
      (res) => {
        if (res.message == 'success') {
          this.allUserNotes = res.Notes;
          console.log(this.allUserNotes);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  callDelete(id: string) {
    let obj = {
      NoteID: id,
      token: localStorage.getItem('myToken'),
    };
    this._NoteService.deleteNote(obj).subscribe(
      (res) => {
        if (res.message == 'deleted') {
          this.getAllUserNotes();
        }
        console.log(res);
      },
      (err) => {
        this.errMsg = err.message;
      }
    );
  }
}
