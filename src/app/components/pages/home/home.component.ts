import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../service/moment.service';
import { Moment } from '../../../Moments';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../../../../environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit{

  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl: string = environment.baseApiUrl

  searchIcon = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {

      const data = items.data;

      data.map((item) => {

        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');

      })
      this.allMoments = data;
      this.moments = data;
    })

    
  }

  search(e: Event): void { 
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.moments = this.allMoments.filter((moment) => { 
      return moment.title && moment.title.toLowerCase().includes(value)
    });
  }


}
