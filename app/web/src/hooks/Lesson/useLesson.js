import { useMemo, useState } from "react";

export const useSortedLesson = (lesson) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedLesson = useMemo(() => {
    setIsSorting(true);
    const sortedLesson = { ...lesson };

    sortedLesson.steps && sortedLesson.steps.sort((a, b) => a.order - b.order);

    setIsSorting(false);
    return sortedLesson;
  }, [lesson]);

  return [sortedLesson, isSorting];
}