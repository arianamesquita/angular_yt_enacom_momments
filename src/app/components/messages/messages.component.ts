import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagesService } from '../../service/messages.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  faTimes = faTimes;

  constructor(public messagesService: MessagesService) { }

}
