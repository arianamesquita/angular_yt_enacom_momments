import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Moment } from '../../../Moments';
import { MomentService } from '../../../service/moment.service';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { MessagesService } from '../../../service/messages.service';

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [CommonModule, MomentFormComponent],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditMomentComponent implements OnInit{
  moment!:Moment;
  btnText: string = "Editar";

  constructor (private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;
    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe();

    this.messageService.add(`Momento ${id} foi atualizado com sucesso!`);

    this.router.navigate(["/"]);
  }

}
