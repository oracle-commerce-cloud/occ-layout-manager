import { insertInstanceAfterStrategy } from "../../../src/listr/strategies/insertInstanceAfterStrategy";

import { findInstance } from "../../../src/helpers/findInstance";

import layoutStructure from "../../mock/layoutStructure.json";

describe("insertInstanceAfterStrategy", () => {
  it("should be defined", async () => {
    expect(insertInstanceAfterStrategy).toBeTruthy();
  });

  it("should insert mainInstance After refInstance.", async () => {
    const refInstance = require("../../mock/refInstance.json");
    const mainInstance = require("../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget, widgetIndex } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // some deep cloning
    const layoutClone = JSON.parse(JSON.stringify(layout));
    const regionClone = JSON.parse(JSON.stringify(region));
    const widgetClone = JSON.parse(JSON.stringify(widget));
    // exec
    insertInstanceAfterStrategy({
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
    expect(region.widgets[widgetIndex + 1]).toEqual({
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

  it("should insert mainInstance After refInstance (with source).", async () => {
    const refInstance = require("../../mock/refInstance.json");
    const mainInstance = require("../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget, widgetIndex } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // set source for the mainInstance
    mainInstance.descriptor.source = 100;
    // exec
    insertInstanceAfterStrategy({
      layout,
      region,
      widget,
      widgetIndex,
      refInstance,
      mainInstance,
    });
    // widget (refInstance) have replaced by mainInstance
    expect(region.widgets[widgetIndex + 1]).toEqual({
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
