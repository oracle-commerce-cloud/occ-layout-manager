export const saveLayoutStructureFactory = (axiosInstance: any) => (
  repositoryId: string,
  { layout }: { layout: { regions: any[] } },
) => axiosInstance.put(`/layouts/${repositoryId}/structure`, { layout }).then((resp: any) => resp.data);
