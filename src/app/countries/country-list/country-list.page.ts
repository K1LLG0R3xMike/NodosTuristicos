// country-list.page.ts - Funcionalidades adicionales opcionales
// Mantén tu código original y agrega solo lo que necesites

import { Component, OnInit } from '@angular/core';
import { CountryService, Country } from '../country.service';
import { City, CityService } from '../city.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
  standalone: false,
  animations: [
    // Animación para el dropdown
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 1 })),
      state('out', style({ height: '0px', opacity: 0 })),
      transition('in <=> out', animate('400ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class CountryListPage implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = []; // Nueva propiedad para filtrado
  citiesByCountry: { [key: string]: City[] } = {};
  loadingCities: { [key: string]: boolean } = {}; // Nuevo para mostrar loading por país
  expandedCountryId: string | null = null;
  searchTerm: string = ''; // Nueva propiedad para búsqueda

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('[🌍] Cargando países...');
    this.loadCountries();
  }

  // Método mejorado para cargar países
  loadCountries() {
    this.countryService.getAll().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = [...data]; // Inicializar filtrado
        console.log('[✅] Países cargados:', this.countries);
      },
      error: (err) => {
        console.error('[❌] Error cargando países:', err);
        // Aquí podrías mostrar un toast de error
      },
    });
  }

  // Método para refrescar países
  refreshCountries() {
    console.log('[🔄] Refrescando países...');
    this.loadCountries();
  }

  // Método mejorado para filtrar países
  filterCountries(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.searchTerm = searchTerm;

    if (!searchTerm) {
      this.filteredCountries = [...this.countries];
      return;
    }

    this.filteredCountries = this.countries.filter(country => {
      // Buscar en nombre del país
      const matchesCountry = 
        country.name.toLowerCase().includes(searchTerm) ||
        country.iso.toLowerCase().includes(searchTerm);

      // Buscar en ciudades (si ya están cargadas)
      const cities = this.citiesByCountry[country.id!] || [];
      const matchesCities = cities.some(city => 
        city.name.toLowerCase().includes(searchTerm)
      );

      return matchesCountry || matchesCities;
    });

    console.log(`[🔍] Filtrado: ${this.filteredCountries.length} países encontrados para "${searchTerm}"`);
  }

  // Método original mejorado
  toggleCountry(countryId: string) {
    console.log(`[📂] Toggle país ID: ${countryId}`);

    if (this.expandedCountryId === countryId) {
      this.expandedCountryId = null;
      console.log('[🔽] Cerrando dropdown de ciudades');
    } else {
      this.expandedCountryId = countryId;
      console.log('[🔼] Abriendo dropdown de ciudades');

      if (!this.citiesByCountry[countryId]) {
        this.loadingCities[countryId] = true; // Mostrar loading
        console.log('[📦] Cargando ciudades desde backend...');
        
        this.cityService.getAll().subscribe({
          next: (data: City[]) => {
            const filtered = data.filter(city => {
              if (
                typeof city.country_id === 'object' &&
                city.country_id !== null &&
                Object.prototype.hasOwnProperty.call(city.country_id, '_id')
              ) {
                return (city.country_id as { _id: string })._id === countryId;
              }
              return city.country_id === countryId;
            });
            
            this.citiesByCountry[countryId] = filtered;
            this.loadingCities[countryId] = false; // Ocultar loading
            console.log(`[✅] Ciudades filtradas para país ${countryId}:`, filtered);
          },
          error: (err) => {
            console.error('[❌] Error cargando ciudades:', err);
            this.loadingCities[countryId] = false; // Ocultar loading en caso de error
            this.citiesByCountry[countryId] = []; // Array vacío para evitar errores
          },
        });
      } else {
        console.log('[📁] Ciudades ya estaban cargadas localmente');
      }
    }
  }

  // Método original
  goToPlaceList(cityId: string) {
    this.router.navigate(['/place-list'], {
      queryParams: { cityId },
    });
  }

  // Métodos de tracking para mejor performance en *ngFor
  trackByCountryId(index: number, country: Country): string {
    return country.id || index.toString();
  }

  trackByCityId(index: number, city: City): string {
    return city.id || index.toString();
  }
}

// No olvides importar trigger, state, style, transition, animate si usas animaciones
// import { trigger, state, style, transition, animate } from '@angular/animations';