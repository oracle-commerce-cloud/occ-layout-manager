export const listLayoutsFactory = (axiosInstance: any) => () =>
  axiosInstance
    .get("/layouts")
    .then((resp: any) =>
      resp.data.items.reduce((layouts: any[], { pageLayouts }: any) => [...layouts, ...pageLayouts], []),
    );
