import {Component, inject} from '@angular/core';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import {ProfileFilters} from './profile-filters/profile-filters';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard,
    ProfileFilters
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles

  constructor() {
  }
}
