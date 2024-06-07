import { Country } from './country.schema';
import { CountryRepository } from './country.repository';
export declare class CountryService {
    private readonly countryRepository;
    constructor(countryRepository: CountryRepository);
    createCountry(country: Partial<Country>): Promise<Country>;
    getAllCountries(): Promise<Country[]>;
    getCountryById(id: string): Promise<Country | null>;
    updateCountry(id: string, country: Partial<Country>): Promise<Country | null>;
    deleteCountry(id: string): Promise<Country | null>;
}
