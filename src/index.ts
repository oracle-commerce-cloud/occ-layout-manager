import Listr from "listr";
import program from "commander";
import { useApi, useApiProps } from "./api";
import { Observable } from "rxjs";

program
  .option(
    "-n, --node <node>",
    "URL for the Commerce Cloud administration interface, for example, http://localhost:9080",
  )
  .option(
    "-k, --applicationKey <key>",
    "The application key to use to log in to the Commerce Cloud administration interface",
  )
  .option("-s, --selectedInstance <repositoryId>", "test pizza size")
  .option("-r, --newInstance <repositoryId>", "small pizza size");

program.parse(process.argv);

const { selectedInstance, newInstance } = program;
const { login, listLayouts, listInstances, getLayoutStructure, saveLayoutStructure } = useApi(
  (program as any) as useApiProps,
);
const timer = "first login";

const tasks = new Listr([
  {
    title: "login: get admin accessToken.",
    task: async (ctx, task) => {
      try {
        ctx.login = true;
        if (!program.node || !program.applicationKey) {
          throw new Error("Yarn not available, install it via `npm install -g yarn`");
        }
        const a = await login();
        console.time(timer);
      } catch (e) {
        ctx.login = false;
        task.skip(e.message);
      }
    },
  },
  {
    title: "List all the layouts.",
    enabled: (ctx) => ctx.login,
    task: async (ctx) => {
      ctx.layouts = await listLayouts();
    },
  },
  {
    title: "fetch all widget descriptors along with their associated instances",
    enabled: (ctx) => ctx.layouts instanceof Array,
    task: async (ctx) => {
      ctx.Instances = await listInstances();
    },
  },
  {
    title: "get the selected widget instance",
    enabled: (ctx) => selectedInstance && ctx.Instances instanceof Array,
    task: async (ctx) => {
      ctx.selectedInstance = ctx.Instances.find((instance: any) => instance.repositoryId === selectedInstance);
    },
  },
  {
    title: "get the new widget instance",
    enabled: (ctx) => newInstance && ctx.Instances instanceof Array,
    task: async (ctx) => {
      ctx.newInstance = ctx.Instances.find((instance: any) => instance.repositoryId === newInstance);
    },
  },
  {
    title: "filter layouts",
    enabled: (ctx) => newInstance && ctx.Instances instanceof Array,
    task: async (ctx) => {
      const { pageIds } = ctx.selectedInstance;
      ctx.layouts = ctx.layouts
        .filter((page: any) => pageIds.includes(page.repositoryId))
        .map((page: any) => page.layout);
    },
  },
  {
    title: "get & update layout Structure",
    enabled: ({ newInstance, selectedInstance, layouts }) =>
      newInstance && selectedInstance && layouts instanceof Array,
    task: (ctx, task) => {
      const { newInstance, selectedInstance, layouts } = ctx;
      return new Observable((observer) => {
        layouts.map(async ({ repositoryId }: any) => {
          observer.next(`prepare layout structure for ${repositoryId}`);
          let widget: any;
          const { layout } = await getLayoutStructure(repositoryId);
          const region = layout.regions.find((region: any) => {
            widget = region.widgets.find(({ repositoryId }: any) => repositoryId === selectedInstance.repositoryId);
            return widget;
          });

          if (!widget) {
            return observer.next(`problem with layout structure for ${repositoryId}: widget not found`);
          }

          widget.displayName = newInstance.displayName;
          widget.repositoryId = newInstance.repositoryId;
          widget.descriptor = {
            repositoryId: newInstance.descriptor.repositoryId,
            minWidth: 1,
            editableWidget: true,
            source: newInstance.descriptor.source,
          };

          observer.next(`save new layout structure for ${repositoryId}`);
          return saveLayoutStructure(repositoryId, { layout });
          // await sleep(100);
        });

        setTimeout(() => {
          observer.next(console.timeEnd(timer));
          observer.complete();
        }, 4000);
      });
    },
  },
]);

tasks.run().catch((err) => {
  console.error(err);
});
