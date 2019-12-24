import { ILayoutFilterStrategyParams as Props, LayoutBase } from "@Types/listr/LayoutFilterStrategy";

export const filterByInstanceStrategy = <T extends LayoutBase>({ layouts, refInstance, mainInstance }: Props<T>) => {
  const { pageIds } = refInstance || mainInstance;
  return layouts.filter((page: any) => pageIds.includes(page.repositoryId)).map((page: any) => page.layout);
};
