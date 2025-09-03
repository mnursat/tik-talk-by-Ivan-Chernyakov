import {Component, signal} from '@angular/core';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {Dnd} from '../../../common-ui/directives/dnd';
import {FormsModule} from '@angular/forms';
import {ProfileService} from '../../../data/services/profile.service';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-avatar-upload',
  imports: [
    SvgIcon,
    Dnd,
    FormsModule,
    ImgUrlPipe
  ],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {

  constructor(private profileService: ProfileService) {
    profileService.getMe().subscribe(profile => {
      this.preview.set(profile.avatarUrl || '/assets/images/avatar-placeholder.png')
    })
  }

  preview = signal<string>('');

  avatar: File | null = null

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) {
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file);

    this.avatar = file
  }
}
