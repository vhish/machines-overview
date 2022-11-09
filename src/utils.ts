interface genericObject {
  [k: string]: boolean | number | string;
}

export function generateOptions(
  objectArray: genericObject[],
  selectedKey: string
) {
  const uniqueObjects = [
    ...new Map(objectArray.map((m) => [m[selectedKey], m])).values(),
  ];

  const values = uniqueObjects.map((m) => ({
    label: m[selectedKey],
    value: m[selectedKey],
  }));

  return [...new Set(values)];
}

export function filterByKey(
  objectArray: genericObject[],
  selectedKey: string,
  filterValue: string | number | boolean | undefined
) {
  if (filterValue === undefined) {
    return objectArray;
  }
  const values = objectArray.filter((f) => f[selectedKey] === filterValue);

  return values;
}
