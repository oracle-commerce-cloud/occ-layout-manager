export interface WidgetInstance {
  repositoryId: string;
  displayName: string;
  descriptor: {
    repositoryId: string;
    minWidth: number;
    editableWidget: boolean;
    source?: number;
  };
}

export interface Region {
  id?: string;
  displayName?: string;
  widgets: WidgetInstance[];
  width: number;
  name: string;
  type?: number;
  structure?: number;
  height: number;
}

export interface LayoutStructure {
  regions: Region[];
  repositoryId: string;
  displayName: string;
  name: string;
}
