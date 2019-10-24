
export const getLayoutStructureFactory = (axiosInstance: any) => (repositoryId: string) =>
  axiosInstance.get(`/layouts/${repositoryId}/structure`).then((resp: any) => resp.data);
