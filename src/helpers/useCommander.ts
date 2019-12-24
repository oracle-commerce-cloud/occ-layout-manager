import program from "commander";
import { UseApiProps } from "@api";
import { t } from "@locales/translate";

interface UseCommonder extends UseApiProps {
  locale: string;
}

export const useCommonder = (): UseCommonder => {
  program
    .description(t("programDescription"))
    .option(
      "-n, --node <node>",
      "URL for the Commerce Cloud administration interface, for example, http://localhost:9080",
    )
    .option(
      "-k, --applicationKey <key>",
      "The application key to use to log in to the Commerce Cloud administration interface",
    )
    .option("-l, --locale <locale>", "default: en ", /^(en|fr)$/i, "en");

  program.parse(process.argv);

  return (program as any) as UseCommonder;
};
