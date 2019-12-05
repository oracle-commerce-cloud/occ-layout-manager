import { resources as en } from "../locales/en.json";
import { resources as fr } from "../locales/fr.json";

const resourcesMapping: { [key: string]: any } = { en, fr };
// en is default locale
let resources: { [key: string]: string } = en;

export function useTranslate (locale?: string) {
  if (locale) {
    resources = resourcesMapping[locale] || resources;
  }
  return { resources };
}
