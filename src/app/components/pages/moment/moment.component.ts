import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, Validators, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { MomentService } from '../../../service/moment.service';
import { Moment } from '../../../Moments';
import { environment } from '../../../../environments/environment';
import { MessagesService } from '../../../service/messages.service';
import { Comment } from '../../../Comment';
import { CommentService } from '../../../service/comment.service';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  editIcon = faEdit;

  commentForm!: FormGroup

  constructor(private momentService: MomentService, 
      private route: ActivatedRoute,
      private messagesService: MessagesService,
      private router: Router,
      private commentService: CommentService ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) =>
      (this.moment = item.data));

    this.commentForm = new FormGroup ({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    })
  }

  get text() { return this.commentForm.get('text')!; }

  get username() { return this.commentForm.get('username')!; }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!")

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective) { 
    if(this.commentForm.invalid){
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!
      .push(comment.data));

    this.messagesService.add("Comentário adicionado!");
    
    //reseta o Form
    this.commentForm.reset();
    formDirective.resetForm();

  }
}
