import { IOperationStrategyParams as Props } from "../../../types/listr/InstanceOperationStrategy";

export const insertInstanceAfterStrategy = ({ layout, region, widget, widgetIndex, mainInstance }: Props) => {
  const source = mainInstance.descriptor.source;
  region.widgets.splice(widgetIndex + 1, 0, {
    displayName: mainInstance.displayName,
    repositoryId: mainInstance.repositoryId,
    descriptor: {
      repositoryId: mainInstance.descriptor.repositoryId,
      minWidth: mainInstance.descriptor.minWidth,
      editableWidget: mainInstance.descriptor.editableWidget,
      ...(source && { source }),
    },
  });
  return layout;
};
