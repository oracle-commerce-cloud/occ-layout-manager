import { IOperationStrategyParams as Props } from "../../types/listr/InstanceOperationStrategy";

export const replaceInstanceStrategy = ({ layout, widget, refInstance, mainInstance }: Props) => {
  const source = mainInstance.descriptor.source;
  widget.displayName = mainInstance.displayName;
  widget.repositoryId = mainInstance.repositoryId;
  widget.descriptor = {
    repositoryId: mainInstance.descriptor.repositoryId,
    minWidth: 1,
    editableWidget: true,
    ...(source && { source }),
  };

  return layout;
};
