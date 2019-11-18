import { LayoutStructure, Region, WidgetInstance } from "../types/api/layoutStructure";

interface FindInstanceParams {
  instanceId: string;
  layout: LayoutStructure;
}

interface FindInstanceResult {
  region: Region;
  widgetIndex?: number;
  widget?: WidgetInstance;
}

export function findInstance ({ instanceId, layout }: FindInstanceParams): FindInstanceResult {
  let widgetIndex: number;
  let widget: WidgetInstance;
  const region = layout.regions.find((reg: any) => {
    widgetIndex = reg.widgets.findIndex(({ repositoryId: id }: any) => id === instanceId);
    widget = reg.widgets[widgetIndex];
    return widget;
  });

  return { region, widget, widgetIndex };
}
