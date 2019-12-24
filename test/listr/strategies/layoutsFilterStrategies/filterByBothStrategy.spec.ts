import { filterByBothStrategy } from "@listr/strategies/layoutFilter/filterByBothStrategy";
import { WidgetInstance } from "@Types/api/layoutStructure";

import layouts from "../../../mock/listLayouts.json";

describe("filterByBothStrategy", () => {
  it("should be defined", async () => {
    expect(filterByBothStrategy).toBeTruthy();
  });

  it("should return the intersection between refInstance and mainInstance: [\"prodPageLayout\"].", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    // some deep cloning
    const layoutsClone = JSON.parse(JSON.stringify(layouts));
    const refInstanceClone = JSON.parse(JSON.stringify(refInstance));
    const mainInstanceClone = JSON.parse(JSON.stringify(mainInstance));
    // exec
    const result = filterByBothStrategy({
      layouts,
      refInstance,
      mainInstance,
    });
    // layouts, refInstance and mainInstance have changed
    expect(layouts).toEqual(layoutsClone);
    expect(refInstance).toEqual(refInstanceClone);
    expect(mainInstance).toEqual(mainInstanceClone);
    // widget (refInstance) have replaced by mainInstance
    expect(result.map(({ repositoryId }) => repositoryId)).toEqual(["prodPageLayout"]);
  });

  it("should return an empty array: [].", async () => {
    const refInstance = undefined as WidgetInstance;
    const mainInstance = require("../../../mock/mainInstance.json");
    // some deep cloning
    const layoutsClone = JSON.parse(JSON.stringify(layouts));
    // exec
    const result = filterByBothStrategy({
      layouts,
      refInstance,
      mainInstance,
    });
    // layouts, refInstance and mainInstance have changed
    expect(layouts).toEqual(layoutsClone);
    // widget (refInstance) have replaced by mainInstance
    expect(result.map(({ repositoryId }) => repositoryId)).toEqual([]);

    // exec
    const result2 = filterByBothStrategy({
      layouts,
      refInstance: undefined as WidgetInstance,
      mainInstance: undefined as WidgetInstance,
    });
    // widget (refInstance) have replaced by mainInstance
    expect(result2.map(({ repositoryId }) => repositoryId)).toEqual([]);
  });
});
