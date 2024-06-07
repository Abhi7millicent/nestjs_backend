import { Country } from './country.schema';
import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    createCountry(createCountryDto: Partial<Country>): Promise<Country>;
    getAllCountries(): Promise<Country[]>;
    getCountryById(id: string): Promise<Country | null>;
    updateCountry(id: string, updateCountryDto: Partial<Country>): Promise<Country | null>;
    deleteCountry(id: string): Promise<Country | null>;
}
