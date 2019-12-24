import { ILayoutFilterStrategyParams as Props, LayoutBase } from "@Types/listr/LayoutFilterStrategy";

const defaultValue = { pageIds: [] as string[] };

export const filterByBothStrategy = <T extends LayoutBase>({ layouts, refInstance, mainInstance }: Props<T>): T[] => {
  const { pageIds: ref } = refInstance || defaultValue;
  const { pageIds: main } = mainInstance || defaultValue;
  return layouts
    .filter((page: any) => ref.includes(page.repositoryId) && main.includes(page.repositoryId))
    .map((page: any) => page.layout);
};
