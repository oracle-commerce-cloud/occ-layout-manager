import program from "commander";
import { UseApiProps } from "../api";
import { t } from "../locales/translate";

export const useCommonder = (): UseApiProps => {
  program
    .description(t("programDescription"))
    .option(
      "-n, --node <node>",
      "URL for the Commerce Cloud administration interface, for example, http://localhost:9080",
    )
    .option(
      "-k, --applicationKey <key>",
      "The application key to use to log in to the Commerce Cloud administration interface",
    );

  program.parse(process.argv);

  return (program as any) as UseApiProps;
};
