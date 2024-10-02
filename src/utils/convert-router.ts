export default function pathsToArray(
  paths: Record<string, string | Record<string, string>>
): string[] {
  const result: string[] = [];

  const extractPaths = (
    obj: Record<string, string | Record<string, string>>
  ) => {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "string") {
        result.push(value);
      } else {
        extractPaths(value);
      }
    }
  };

  extractPaths(paths);
  return result;
}
