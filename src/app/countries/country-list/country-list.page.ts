import { Component, OnInit } from '@angular/core';
import { CountryService, Country } from '../country.service';
import { City, CityService } from '../city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
  standalone: false // Esto indica que este componente no es independiente y necesita un módulo para funcionar
})
export class CountryListPage implements OnInit {
  countries: Country[] = [];
  citiesByCountry: { [key: string]: City[] } = {};
  expandedCountryId: string | null = null;

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('[🌍] Cargando países...');
    this.countryService.getAll().subscribe({
      next: (data) => {
        this.countries = data;
        console.log('[✅] Países cargados:', this.countries);
      },
      error: (err) => console.error('[❌] Error cargando países:', err),
    });
  }

  goToPlaceList(cityId: string) {
  this.router.navigate(['/place-list'], {
    queryParams: { cityId },
  });
}

 toggleCountry(countryId: string) {
  console.log(`[📂] Toggle país ID: ${countryId}`);

  if (this.expandedCountryId === countryId) {
    this.expandedCountryId = null;
    console.log('[🔽] Cerrando dropdown de ciudades');
  } else {
    this.expandedCountryId = countryId;
    console.log('[🔼] Abriendo dropdown de ciudades');

    if (!this.citiesByCountry[countryId]) {
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
          console.log(`[✅] Ciudades filtradas para país ${countryId}:`, filtered);
        },
        error: (err) => console.error('[❌] Error cargando ciudades:', err),
      });
    } else {
      console.log('[📁] Ciudades ya estaban cargadas localmente');
    }
  }
}
}