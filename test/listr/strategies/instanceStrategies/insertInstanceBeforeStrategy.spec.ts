import { insertInstanceBeforeStrategy } from "@listr/strategies/widgetInstances/insertInstanceBeforeStrategy";

import { findInstance } from "@helpers/findInstance";

import layoutStructure from "../../../mock/layoutStructure.json";

describe("insertInstanceBeforeStrategy", () => {
  it("should be defined", async () => {
    expect(insertInstanceBeforeStrategy).toBeTruthy();
  });

  it("should insert mainInstance Before refInstance.", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget, widgetIndex } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // some deep cloning
    const layoutClone = JSON.parse(JSON.stringify(layout));
    const regionClone = JSON.parse(JSON.stringify(region));
    const widgetClone = JSON.parse(JSON.stringify(widget));
    // exec
    insertInstanceBeforeStrategy({
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
    expect(region.widgets.length).toEqual(regionClone.widgets.length + 1);
    expect(region.widgets[widgetIndex]).toEqual({
      displayName: mainInstance.displayName,
      repositoryId: mainInstance.repositoryId,
      descriptor: {
        repositoryId: mainInstance.descriptor.repositoryId,
        minWidth: mainInstance.descriptor.minWidth,
        editableWidget: mainInstance.descriptor.editableWidget,
        ...(mainInstance.descriptor.source && { source: mainInstance.descriptor.source }),
      },
    });
  });

  it("should insert mainInstance Before refInstance (with source).", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget, widgetIndex } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // set source for the mainInstance
    mainInstance.descriptor.source = 100;
    // exec
    insertInstanceBeforeStrategy({
      layout,
      region,
      widget,
      widgetIndex,
      refInstance,
      mainInstance,
    });
    // widget (refInstance) have replaced by mainInstance
    expect(region.widgets[widgetIndex]).toEqual({
      displayName: mainInstance.displayName,
      repositoryId: mainInstance.repositoryId,
      descriptor: {
        repositoryId: mainInstance.descriptor.repositoryId,
        minWidth: mainInstance.descriptor.minWidth,
        editableWidget: mainInstance.descriptor.editableWidget,
        ...(mainInstance.descriptor.source && { source: mainInstance.descriptor.source }),
      },
    });
  });
});
