import { resources, useTranslate } from "../mock/useTranslateMock";
import { t } from "../../src/locales/translate";

describe("locales/translate", () => {
  beforeEach(useTranslate.mockClear);

  it("should be defined", async () => {
    expect(t).toBeTruthy();
  });

  it("should return 'en' as default.", async () => {
    const value = t("key not found");
    expect(useTranslate).toHaveBeenCalledTimes(1);
    expect(value).toEqual("key not found");
    expect(console.log).toHaveBeenCalledWith("key not found");
  });

  it("should return thé correct value.", async () => {
    const value = t("key");
    expect(useTranslate).toHaveBeenCalledTimes(1);
    expect(value).toEqual(resources.key);
  });

  it("should be able to use with some params.", async () => {
    let value = t("keyWithParam", { repositoryId: 5454 });
    expect(useTranslate).toHaveBeenCalledTimes(1);
    expect(value).toEqual(resources.keyWithParam.replace("__repositoryId__", "5454"));
    value = t("keyWith3Param", { param1: 5454, param2: "value", param3: true });
    expect(useTranslate).toHaveBeenCalledTimes(2);
    expect(value).toEqual(
      resources.keyWith3Param
        .replace("__param1__", "5454")
        .replace("__param2__", "value")
        .replace("__param3__", "true"),
    );
  });

  it("should ignore unused params.", async () => {
    const value = t("keyWithParam", { paramNotFound: 5454 });
    expect(useTranslate).toHaveBeenCalledTimes(1);
    expect(value).toEqual(resources.keyWithParam);
  });
});
