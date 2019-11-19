import { WidgetInstance } from "../types/api/layoutStructure";

export const listInstancesFactory = (axiosInstance: any) => async (): Promise<WidgetInstance[]> => {
  const items = await axiosInstance.get("/widgetDescriptors/instances").then((resp: any) => resp.data.items);
  return items.reduce(
    (instances: any[], widget: any) => [
      ...instances,
      ...(widget.instances || []).map((instance: any) => ({
        ...instance,
        descriptor: {
          ...widget,
          instances: undefined,
        },
      })),
    ],
    [],
  );
};
