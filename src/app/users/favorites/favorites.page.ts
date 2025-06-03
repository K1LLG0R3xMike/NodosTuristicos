import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Site, SiteService } from 'src/app/places/place.service';
import { LocalDataService } from 'src/app/core/storage.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})
export class FavoritesPage implements OnInit {
  favoriteSites: any[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private siteService: SiteService,
    private localData: LocalDataService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  async loadFavorites() {
    this.isLoading = true;
    this.error = null;
    try {
      const allSites = await this.siteService.getAll().toPromise();
      const favIds = await this.localData.getFavorites();
      this.favoriteSites = (allSites ?? []).filter(site => site.id !== undefined && favIds.includes(site.id as string));
    } catch (err) {
      this.error = 'No se pudieron cargar los favoritos.';
    }
    this.isLoading = false;
  }
}
