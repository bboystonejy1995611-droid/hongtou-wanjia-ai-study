"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import { parseStoredArray, writeStoredArray } from "@/lib/storage";
import type {
  MistakeEntry,
  ParentReportSnapshot,
  StudyRecord,
} from "@/lib/types";

function makeLocalId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

function prependItem<T>(items: T[], item: T) {
  return [item, ...items];
}

export function useStudyData() {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [reports, setReports] = useState<ParentReportSnapshot[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMistakes(parseStoredArray<MistakeEntry>(localStorage.getItem(STORAGE_KEYS.mistakes)));
    setRecords(parseStoredArray<StudyRecord>(localStorage.getItem(STORAGE_KEYS.records)));
    setReports(
      parseStoredArray<ParentReportSnapshot>(localStorage.getItem(STORAGE_KEYS.reports)),
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      writeStoredArray(localStorage, STORAGE_KEYS.mistakes, mistakes);
    }
  }, [hydrated, mistakes]);

  useEffect(() => {
    if (hydrated) {
      writeStoredArray(localStorage, STORAGE_KEYS.records, records);
    }
  }, [hydrated, records]);

  useEffect(() => {
    if (hydrated) {
      writeStoredArray(localStorage, STORAGE_KEYS.reports, reports);
    }
  }, [hydrated, reports]);

  const addRecord = useCallback((record: Omit<StudyRecord, "id" | "createdAt">) => {
    const nextRecord: StudyRecord = {
      ...record,
      createdAt: new Date().toISOString(),
      id: makeLocalId("record"),
    };

    setRecords((current) => prependItem(current, nextRecord));

    return nextRecord;
  }, []);

  const addMistake = useCallback(
    (mistake: Omit<MistakeEntry, "id" | "createdAt" | "mastered">) => {
      const nextMistake: MistakeEntry = {
        ...mistake,
        createdAt: new Date().toISOString(),
        id: makeLocalId("mistake"),
        mastered: false,
      };

      setMistakes((current) => prependItem(current, nextMistake));
      addRecord({
        detail: nextMistake.knowledgePoint,
        grade: nextMistake.grade,
        kind: "mistake",
        subject: nextMistake.subject,
        title: `收录错题：${nextMistake.question.slice(0, 28)}`,
      });

      return nextMistake;
    },
    [addRecord],
  );

  const deleteMistake = useCallback((id: string) => {
    setMistakes((current) => current.filter((mistake) => mistake.id !== id));
  }, []);

  const toggleMistake = useCallback((id: string) => {
    setMistakes((current) =>
      current.map((mistake) =>
        mistake.id === id
          ? {
              ...mistake,
              mastered: !mistake.mastered,
            }
          : mistake,
      ),
    );
  }, []);

  const saveReport = useCallback((report: ParentReportSnapshot) => {
    setReports((current) => prependItem(current, report));
  }, []);

  const recentRecords = useMemo(() => records.slice(0, 8), [records]);

  return {
    addMistake,
    addRecord,
    deleteMistake,
    hydrated,
    mistakes,
    recentRecords,
    records,
    reports,
    saveReport,
    toggleMistake,
  };
}
