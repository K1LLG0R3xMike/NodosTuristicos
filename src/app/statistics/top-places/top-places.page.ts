import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SiteService, Site } from 'src/app/places/place.service';

@Component({
  selector: 'app-top-places',
  templateUrl: './top-places.page.html',
  styleUrls: ['./top-places.page.scss'],
  standalone: false
})
export class TopPlacesPage implements OnInit {
  topSites: { site: Site, count: number }[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private siteService: SiteService) {}

  ngOnInit() {
    this.loadTopSites();
  }

  async loadTopSites() {
    this.isLoading = true;
    this.error = null;
    try {
      console.log('Solicitando visitas...');
      // 1. Trae todas las visitas
      const visits: any[] = (await this.http.get<any[]>(`${environment.apiUrl}/visitas`).toPromise()) ?? [];
      console.log('Visitas recibidas:', visits);

      // 2. Cuenta las visitas por sitio
      const counts: { [siteId: string]: number } = {};
      visits.forEach(v => {
        // Extrae el id real del sitio desde la visita
        let siteId = v.site_id;
        if (siteId && typeof siteId === 'object' && siteId.id) {
          siteId = siteId.id;
        }
        siteId = String(siteId);
        if (siteId) {
          counts[siteId] = (counts[siteId] || 0) + 1;
        }
      });
      console.log('Conteo de visitas por sitio:', counts);

      // 3. Trae todos los sitios
      const allSites: Site[] = (await this.siteService.getAll().toPromise()) ?? [];
      console.log('Sitios recibidos:', allSites);

      // 4. Une los datos y ordena por visitas
      this.topSites = Object.entries(counts)
        .map(([siteId, count]) => {
          const site = allSites.find(s => String(s.id) === siteId);
          if (!site) {
            console.warn('No se encontró sitio para siteId:', siteId);
          }
          if (site) {
            return { site, count };
          }
          return undefined;
        })
        .filter((s): s is { site: Site, count: number } => !!s)
        .sort((a, b) => b.count - a.count);

      console.log('Top sitios:', this.topSites);

    } catch (err) {
      this.error = 'No se pudieron cargar las estadísticas.';
      console.error('Error al cargar estadísticas:', err);
    }
    this.isLoading = false;
  }
}
