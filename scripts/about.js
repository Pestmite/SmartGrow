import { selectPage } from "./general.js";
import { generateAspects, switchSection } from "../data/aspects.js";

document.querySelectorAll('.about-select-js').forEach((tab) => {
  tab.addEventListener('click', () => switchSection(tab))
});

selectPage('About');
generateAspects('features');