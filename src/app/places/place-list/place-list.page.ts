import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Site, SiteService } from '../place.service';
import { LocalDataService } from 'src/app/core/storage.service';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html',
  styleUrls: ['./place-list.page.scss'],
  standalone: false
})
export class PlaceListPage implements OnInit {

  site: Site[] = [];
  cityId: string = '';
  favorites: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private siteservice: SiteService,
    private localData: LocalDataService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cityId = params['cityId'];
      if (this.cityId) {
        this.loadPlacesByCity();
      }
    });
    this.loadFavorites();
  }

  loadPlacesByCity() {
    this.siteservice.getAll().subscribe({
      next: (places) => {
        this.site = places.filter(p => {
          if (typeof p.city_id === 'string') {
            return p.city_id === this.cityId;
          } else if (p.city_id && typeof p.city_id === 'object' && '_id' in p.city_id) {
            return (p.city_id as { _id: string })._id === this.cityId;
          }
          return false;
        });
        console.log('Sitios filtrados por ciudad:', this.site);
      },
      error: (err) => console.error('Error al cargar sitios:', err),
    });
  }

  async loadFavorites() {
    this.favorites = await this.localData.getFavorites();
  }

  async toggleFavorite(siteId: string) {
    await this.localData.toggleFavorite(siteId);
    this.favorites = await this.localData.getFavorites();
  }

  isFavorite(siteId: string): boolean {
    return this.favorites.includes(siteId);
  }
}