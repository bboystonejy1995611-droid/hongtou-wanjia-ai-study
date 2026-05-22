export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export function parseStoredArray<T>(rawValue: string | null): T[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
}

export function storageIsUsable(storage?: StorageLike): boolean {
  if (!storage) {
    return false;
  }

  try {
    const testKey = "__dance_growth_storage_test__";
    storage.setItem(testKey, "ok");
    storage.removeItem(testKey);

    return true;
  } catch {
    return false;
  }
}

export function writeStoredArray<T>(
  storage: StorageLike | undefined,
  key: string,
  value: T[],
): boolean {
  if (!storage || !storageIsUsable(storage)) {
    return false;
  }

  storage.setItem(key, JSON.stringify(value));

  return true;
}
