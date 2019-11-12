import * as UseTranslate from "../../src/helpers/useTranslate";

export const resources = {
  key: "value",
  keyWithParam: "Prepare ... __repositoryId__",
  keyWith3Param: "Prepare ... __param1__ / __param2__ dd __param3__",
};

jest.mock("../../src/helpers/useTranslate", () => {
  return {
    useTranslate: jest.fn(() => ({ resources })),
  };
});

jest.spyOn(global.console, "log");

export const { useTranslate }: any = UseTranslate;
