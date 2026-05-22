import { describe, expect, it } from "vitest";

import { parseStoredArray, storageIsUsable } from "./storage";

describe("local storage helpers", () => {
  it("falls back cleanly when persisted JSON is missing or broken", () => {
    expect(parseStoredArray(null)).toEqual([]);
    expect(parseStoredArray("{broken")).toEqual([]);
    expect(parseStoredArray('[{"id":"ok"}]')).toEqual([{ id: "ok" }]);
  });

  it("detects writable browser storage", () => {
    const fakeStorage = new Map<string, string>();
    const storage = {
      getItem: (key: string) => fakeStorage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        fakeStorage.set(key, value);
      },
      removeItem: (key: string) => {
        fakeStorage.delete(key);
      },
    };

    expect(storageIsUsable(storage)).toBe(true);
  });
});
