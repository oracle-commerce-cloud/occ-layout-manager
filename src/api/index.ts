import axios from "axios";
import axiosRetry from "axios-retry";
import { loginFactory } from "./login";
import { listLayoutsFactory } from "./listLayouts";
import { listInstancesFactory } from "./listInstances";
import { getLayoutStructureFactory } from "./getLayoutStructure";
import { saveLayoutStructureFactory } from "./saveLayoutStructure";
import { LayoutStructure, WidgetInstance } from "../types/api/layoutStructure";

export interface UseApiProps {
  node: string;
  applicationKey: string;
}

export interface UseApi {
  login: () => Promise<string>;
  listLayouts: () => Promise<any>;
  listInstances: () => Promise<WidgetInstance[]>;
  getLayoutStructure: (repositoryId: string) => Promise<any>;
  saveLayoutStructure: (repositoryId: string, data: { layout: LayoutStructure }) => Promise<LayoutStructure>;
}

// cache
const clientMap: Map<string, UseApi> = new Map<string, UseApi>();

export const useApi = ({ node, applicationKey }: UseApiProps): UseApi => {
  if (!clientMap.has(applicationKey)) {
    const axiosInstance: any = axios.create({
      baseURL: `${node}/;/ccadmin/v1`.replace(/\/+;\/+/i, "/"),
    });

    axiosRetry(axiosInstance, { retries: 3 });

    clientMap.set(applicationKey, {
      login: loginFactory(axiosInstance, applicationKey),
      listLayouts: listLayoutsFactory(axiosInstance),
      listInstances: listInstancesFactory(axiosInstance),
      getLayoutStructure: getLayoutStructureFactory(axiosInstance),
      saveLayoutStructure: saveLayoutStructureFactory(axiosInstance),
    });
  }
  return clientMap.get(applicationKey);
};
