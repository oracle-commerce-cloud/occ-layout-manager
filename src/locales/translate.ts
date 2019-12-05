import { useTranslate } from "@helpers/useTranslate";

export function t (resourcesKey: string, params?: { [key: string]: any }): string {
  const { resources } = useTranslate();
  let value = resources[resourcesKey];
  if (!value) {
    console.log(resourcesKey); // tslint:disable-line
  } else if (params) {
    Object.entries(params).map(([key, paramValue]) => (value = value.replace(`__${key}__`, paramValue)));
  }
  return value || resourcesKey;
}
