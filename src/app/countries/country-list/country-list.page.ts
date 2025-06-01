import { Component, OnInit } from '@angular/core';
import { CountryService, Country } from '../country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
  standalone: false // Esto indica que este componente no es independiente y necesita un módulo para funcionar
})
export class CountryListPage implements OnInit {

  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAll().subscribe({
      next: (data) => {
        console.log('Países cargados:', data);
        this.countries = data;
      },
      error: (err) => {
        console.error(' Error al cargar países:', err);
      }
    });
  }
}
