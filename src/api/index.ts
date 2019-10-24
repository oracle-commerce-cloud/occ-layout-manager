import axios from "axios";
import { loginFactory } from "./login";
import { listLayoutsFactory } from "./listLayouts";
import { listInstancesFactory } from "./listInstances";
import { getLayoutStructureFactory } from "./getLayoutStructure";
import { saveLayoutStructureFactory } from "./saveLayoutStructure";

export interface UseApiProps {
  node: string;
  applicationKey: string;
}

export interface UseApi {
  login: () => Promise<any>;
  listLayouts: () => Promise<any>;
  listInstances: () => Promise<any>;
  getLayoutStructure: (repositoryId: string) => Promise<any>;
  saveLayoutStructure: (repositoryId: string, data: { layout: { regions: any[] } }) => Promise<any>;
}

export const useApi = ({ node, applicationKey }: UseApiProps): UseApi => {
  const axiosInstance: any = axios.create({
    baseURL: `${node}/;/ccadmin/v1`.replace(/\/+;\/+/i, "/"),
  });

  return {
    login: loginFactory(axiosInstance, applicationKey),
    listLayouts: listLayoutsFactory(axiosInstance),
    listInstances: listInstancesFactory(axiosInstance),
    getLayoutStructure: getLayoutStructureFactory(axiosInstance),
    saveLayoutStructure: saveLayoutStructureFactory(axiosInstance),
  };
};
