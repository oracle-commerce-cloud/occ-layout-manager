import { LayoutStructure } from "../types/api/layoutStructure";

export const saveLayoutStructureFactory = (axiosInstance: any) => (
  repositoryId: string,
  { layout }: { layout: LayoutStructure },
) => axiosInstance.put(`/layouts/${repositoryId}/structure`, { layout }).then((resp: any) => resp.data);
