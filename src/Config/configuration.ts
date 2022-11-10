import { Config } from "./types/config";

export const getConfiguration = async (): Promise<any> => {
  const fetchResult = await fetch(`./config/config.json`);
  const jsonResult = await fetchResult.json();
  return jsonResult as Config;
};
