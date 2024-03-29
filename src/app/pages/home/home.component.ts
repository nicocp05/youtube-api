import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  delay: number = 1;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {

    this.getVideos();

  }

  getVideos() {
    this.youtubeService.getVideos()
      .subscribe((res: Video[]) => {
        this.videos.push(...res);
        console.log(this.videos);
      });
  }

  showVideos(video: Video) {
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <hr>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.resourceId.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `
    });
  }

}
