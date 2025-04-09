import { jsonDataFilePath } from "@/constants/json_path";
import { UserFormData } from "@/types/app.type";
import { promises as fs } from "fs";

export const readJSONFileAsync = async (): Promise<UserFormData> => {
  const fileContent = await fs.readFile(jsonDataFilePath, "utf-8");

  const data = JSON.parse(fileContent) as UserFormData;

  return data;
};

export const writeJSONFileAsync = async (data: UserFormData): Promise<void> => {
  const jsonData = JSON.stringify(data, null, 2);

  await fs.writeFile(jsonDataFilePath, jsonData, "utf-8");
};
