import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";
import CopyUtils from "../../utils/CopyUtils";

export const useSortedLesson = (lesson) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedLesson = useMemo(() => {
    setIsSorting(true);

    const sortedLesson = { ...lesson };
    sortedLesson.steps && sortedLesson.steps.sort((a, b) => a.order - b.order);

    setIsSorting(false);
    return CopyUtils.deepFreeze(sortedLesson);
  }, [lesson]);

  return [sortedLesson, isSorting];
};

export const useUpdatedLesson = (lesson) => {
  const [sortedLesson, isSorting] = useSortedLesson(lesson);
  const [updatedLesson, setUpdatedLesson] = useState(null);
  const [isCopying, setIsCopying] = useState(true);

  useEffect(() => {
    setIsCopying(true);
    setUpdatedLesson(cloneDeep(sortedLesson));
    setIsCopying(updatedLesson === null);
  }, [sortedLesson]);

  return [updatedLesson, sortedLesson, isCopying, isSorting, setUpdatedLesson];
};