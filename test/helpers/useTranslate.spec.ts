import { useTranslate } from "@helpers/useTranslate";
import { resources as en } from "../../src/locales/en.json";
import { resources as fr } from "../../src/locales/fr.json";

describe("useTranslate", () => {
  it("should be defined", async () => {
    expect(useTranslate).toBeTruthy();
  });

  it("should return 'en' as default.", async () => {
    const { resources } = useTranslate();
    expect(resources).toEqual(en);
  });

  it("should be able to specify once & remember the last choice.", async () => {
    expect(useTranslate("fr").resources).toEqual(fr);
    expect(useTranslate().resources).toEqual(fr);
    expect(useTranslate("en").resources).toEqual(en);
    expect(useTranslate().resources).toEqual(en);
  });

  it("should be able to handle invalid locales.", async () => {
    // return the cached value / default value
    expect(useTranslate("jhsdjsdf").resources).toEqual(en);
  });
});
