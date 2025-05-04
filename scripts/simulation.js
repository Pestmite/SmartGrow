import { selectPage } from "./general.js";
import { generateForecast } from './overview/forecast.js';

selectPage('Simulation');
generateForecast(true);