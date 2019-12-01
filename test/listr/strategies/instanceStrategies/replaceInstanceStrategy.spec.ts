import { replaceInstanceStrategy } from "@listr/strategies/widgetInstances/replaceInstanceStrategy";

import { findInstance } from "@helpers/findInstance";

import layoutStructure from "../../../mock/layoutStructure.json";

describe("replaceInstanceStrategy", () => {
  it("should be defined", async () => {
    expect(replaceInstanceStrategy).toBeTruthy();
  });

  it("should replace refInstance by mainInstance.", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // some deep cloning
    const layoutClone = JSON.parse(JSON.stringify(layout));
    const regionClone = JSON.parse(JSON.stringify(region));
    const widgetClone = JSON.parse(JSON.stringify(widget));
    // exec
    replaceInstanceStrategy({
      layout,
      region,
      widget,
      refInstance,
      mainInstance,
    });
    // layout, region and widget have changed
    expect(layout).not.toEqual(layoutClone);
    expect(region).not.toEqual(regionClone);
    expect(widget).not.toEqual(widgetClone);
    // widget (refInstance) have replaced by mainInstance
    expect(layout.regions.length).toEqual(layoutClone.regions.length);
    expect(region.widgets.length).toEqual(regionClone.widgets.length);
    expect(widget).toEqual({
      displayName: mainInstance.displayName,
      repositoryId: mainInstance.repositoryId,
      descriptor: {
        repositoryId: mainInstance.descriptor.repositoryId,
        minWidth: 1,
        editableWidget: true,
        ...(mainInstance.descriptor.source && { source: mainInstance.descriptor.source }),
      },
    });
  });

  it("should replace refInstance by mainInstance (with source).", async () => {
    const refInstance = require("../../../mock/refInstance.json");
    const mainInstance = require("../../../mock/mainInstance.json");
    const { layout } = JSON.parse(JSON.stringify(layoutStructure));
    const { region, widget } = findInstance({ layout, instanceId: refInstance.repositoryId });
    // set source for the mainInstance
    mainInstance.descriptor.source = 100;
    // exec
    replaceInstanceStrategy({
      layout,
      region,
      widget,
      refInstance,
      mainInstance,
    });
    // widget (refInstance) have replaced by mainInstance
    expect(widget).toEqual({
      displayName: mainInstance.displayName,
      repositoryId: mainInstance.repositoryId,
      descriptor: {
        repositoryId: mainInstance.descriptor.repositoryId,
        minWidth: 1,
        editableWidget: true,
        ...(mainInstance.descriptor.source && { source: mainInstance.descriptor.source }),
      },
    });
  });
});
