import { filterByInstanceStrategy } from "@listr/strategies/layoutFilter/filterByInstanceStrategy";
import { WidgetInstance } from "@Types/api/layoutStructure";

import layouts from "../../../mock/listLayouts.json";

describe("filterByInstanceStrategy", () => {
  it("should be defined", async () => {
    expect(filterByInstanceStrategy).toBeTruthy();
  });

  it("should return layouts that match refInstance: [\"homePageLayout\", \"prodPageLayout\"].", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    // some deep cloning
    const layoutsClone = JSON.parse(JSON.stringify(layouts));
    const refInstanceClone = JSON.parse(JSON.stringify(refInstance));
    const mainInstanceClone = JSON.parse(JSON.stringify(mainInstance));
    // exec
    const result = filterByInstanceStrategy({
      layouts,
      refInstance,
      mainInstance,
    });
    // layouts, refInstance and mainInstance have changed
    expect(layouts).toEqual(layoutsClone);
    expect(refInstance).toEqual(refInstanceClone);
    expect(mainInstance).toEqual(mainInstanceClone);
    // widget (refInstance) have replaced by mainInstance
    expect(result.map(({ repositoryId }) => repositoryId)).toEqual(["homePageLayout", "prodPageLayout"]);
  });

  it("should return layouts that match mainInstance: [\"prodPageLayout\"].", async () => {
    const refInstance = undefined as WidgetInstance;
    const mainInstance = require("../../../mock/mainInstance.json");
    // some deep cloning
    const layoutsClone = JSON.parse(JSON.stringify(layouts));
    const mainInstanceClone = JSON.parse(JSON.stringify(mainInstance));
    // exec
    const result = filterByInstanceStrategy({
      layouts,
      refInstance,
      mainInstance,
    });
    // layouts, refInstance and mainInstance have changed
    expect(layouts).toEqual(layoutsClone);
    expect(mainInstance).toEqual(mainInstanceClone);
    // widget (refInstance) have replaced by mainInstance
    expect(result.map(({ repositoryId }) => repositoryId)).toEqual(["prodPageLayout"]);
  });
});
