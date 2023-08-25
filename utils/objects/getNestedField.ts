export default function getNestedField(
  field: string,
  nestedObject: object
): any {
  const fieldKeys = field?.split(".");

  let resultField = nestedObject;

  let tempKey: string | string[] = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const key of fieldKeys) {
    if (resultField && typeof resultField === "object") {
      if (key.includes("[")) {
        tempKey = key.split("");

        tempKey.shift();

        tempKey.pop();

        tempKey = tempKey.join();

        tempKey = Object.keys(resultField)[tempKey];

        resultField = resultField[tempKey as string];

        tempKey = "";
        // eslint-disable-next-line no-continue
        continue;
      }
      resultField = resultField[key];
    } else {
      return undefined;
    }
  }

  return resultField;
}
