import { resources as en } from "../locales/en.json";
import { resources as fr } from "../locales/fr.json";

const resourcesMapping: { [key: string]: any } = { en, fr };
// en is default local
let resources: { [key: string]: string } = en;

export function useTranslate (local?: string) {
  if (local) {
    resources = resourcesMapping[local] || resources;
  }
  return { resources };
}
