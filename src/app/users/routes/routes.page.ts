import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalDataService } from 'src/app/core/storage.service'; // Asegúrate de importar tu servicio

declare var mapboxgl: any;

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
  standalone: false
})
export class RoutesPage implements OnInit, AfterViewInit {

  private api = `${environment.apiUrl}/sitios`;
  map: any;
  mapboxToken = 'pk.eyJ1IjoiamRkaWF6YzMiLCJhIjoiY21iZDl3ZXJtMHlxNzJrb2VvcTc4azVwbiJ9.2wYK_i6vaGvYPkfkIlvZDQ';

  favoritos: any[] = [];

  constructor(
    private http: HttpClient,
    private localData: LocalDataService // Inyecta el servicio
  ) {}

  async ngOnInit() {
    this.initMap();

    // 1. Trae todos los sitios
    let allSitesResult = await this.getAll().toPromise();
    let allSites: any[] = Array.isArray(allSitesResult) ? allSitesResult : [];
    console.log('Todos los sitios:', allSites);

    // 2. Obtén los IDs de favoritos
    const favIds: string[] = await this.localData.getFavorites();
    console.log('IDs de favoritos:', favIds);

    // 3. Filtra los sitios favoritos
    this.favoritos = allSites.filter(site => favIds.includes(site.id));
    console.log('Favoritos cargados:', this.favoritos);
  }

  initMap() {
    console.log('Inicializando mapa...');
    (window as any).mapboxgl.accessToken = this.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-76.5225, 3.4516], // Centro de Cali, Colombia
      zoom: 12
    });

    this.map.on('load', () => {
      console.log('Mapa cargado correctamente');
      // Agrega marcadores de favoritos
      this.favoritos.forEach(fav => {
        if (fav.lng && fav.lat) {
          new mapboxgl.Marker()
            .setLngLat([fav.lng, fav.lat])
            .setPopup(new mapboxgl.Popup().setText(fav.name || 'Favorito'))
            .addTo(this.map);
        }
      });

      // Dibuja la ruta si hay al menos dos favoritos
      if (this.favoritos.length >= 2) {
        this.drawRoute();
      }

      setTimeout(() => {
        this.map.resize();
      }, 300);
    });
  }

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  ngAfterViewInit() {
    // Ya no necesitas setInterval aquí
  }

  drawRoute() {
    if (this.favoritos.length < 2) return;

    const coordinates = this.favoritos.map(f => `${f.lng},${f.lat}`).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${this.mapboxToken}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data.routes || !data.routes[0]) {
          console.warn('No se encontró una ruta entre los puntos.');
          return;
        }
        const route = data.routes[0].geometry;

        if (this.map.getSource('route')) {
          this.map.getSource('route').setData({
            type: 'Feature',
            properties: {},
            geometry: route
          });
        } else {
          this.map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route
            }
          });
          this.map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3b9ddd',
              'line-width': 6
            }
          });
        }
      })
      .catch(err => {
        console.error('Error al obtener la ruta de Mapbox:', err);
      });
  }
}
