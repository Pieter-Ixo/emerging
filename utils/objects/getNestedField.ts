export default function getNestedField(
  field: string,
  nestedObject: object
): any {
  const fieldKeys = field?.split(".");

  let resultField = nestedObject;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of fieldKeys) {
    if (resultField && typeof resultField === "object" && key in resultField) {
      resultField = resultField[key];
    } else {
      return undefined;
    }
  }

  return resultField;
}
