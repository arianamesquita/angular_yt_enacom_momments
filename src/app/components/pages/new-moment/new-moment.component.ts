import { Component } from '@angular/core';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { Router } from '@angular/router';

import { Moment } from '../../../Moments';
import { MomentService} from '../../../service/moment.service';
import { MessagesService } from '../../../service/messages.service';

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [MomentFormComponent],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = "Compartilhar!";

  constructor(private momentService: MomentService,
      private messagesService: MessagesService, 
      private router: Router) { }

  async createHandler(moment: Moment) { 
    const formData = new FormData();
    
    formData.append("title", moment.title);
    formData.append("description", moment.description);
    
    if(moment.image){
      formData.append("image", moment.image)
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add("Momento adicionado com sucesso!");

    this.router.navigate(['/']);
  }
}
