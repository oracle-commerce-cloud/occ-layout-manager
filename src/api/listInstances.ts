export const listInstancesFactory = (axiosInstance: any) => async () => {
  const items = await axiosInstance.get("/widgetDescriptors/instances").then((resp: any) => resp.data.items);
  return items.reduce(
    (instances: any[], widget: any) => [
      ...instances,
      ...widget.instances.map((instance: any) => ({
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
