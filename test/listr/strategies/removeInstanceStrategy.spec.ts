import { removeInstanceStrategy } from "../../../src/listr/strategies/removeInstanceStrategy";

import { findInstance } from "../../../src/helpers/findInstance";
import { WidgetInstance } from "../../../src/types/api/layoutStructure";

import layoutStructure from "../../mock/layoutStructure.json";

describe("removeInstanceStrategy", () => {
  it("should be defined", async () => {
    expect(removeInstanceStrategy).toBeTruthy();
  });

  it("should remove mainInstance.", async () => {
    const refInstance: WidgetInstance = undefined;
    const mainInstance = require("../../mock/refInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget, widgetIndex } = findInstance({ layout, instanceId: mainInstance.repositoryId });
    // some deep cloning
    const layoutClone = JSON.parse(JSON.stringify(layout));
    const regionClone = JSON.parse(JSON.stringify(region));
    const widgetClone = JSON.parse(JSON.stringify(widget));
    // exec
    removeInstanceStrategy({
      layout,
      region,
      widget,
      widgetIndex,
      refInstance,
      mainInstance,
    });
    // layout, region and widget have changed
    expect(layout).not.toEqual(layoutClone);
    expect(region).not.toEqual(regionClone);
    expect(widget).toEqual(widgetClone);
    // widget (refInstance) have replaced by mainInstance
    expect(layout.regions.length).toEqual(layoutClone.regions.length);
    expect(region.widgets.length).toEqual(regionClone.widgets.length - 1);
  });
});
