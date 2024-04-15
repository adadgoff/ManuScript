import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";
import CopyUtils from "../../utils/CopyUtils";

export const useSortedClassroom = (classroom) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedClassroom = useMemo(() => {
    setIsSorting(true);
    const sortedClassroom = { ...classroom };

    sortedClassroom.modules && sortedClassroom.modules.sort((a, b) => a.order - b.order);

    sortedClassroom.modules && sortedClassroom.modules.forEach((module) => {
      module.lessons && module.lessons.sort((a, b) => a.order - b.order);
    });

    setIsSorting(false);
    return CopyUtils.deepFreeze(sortedClassroom);
  }, [classroom]);

  return [sortedClassroom, isSorting];
}

export const useUpdatedClassroom = (classroom) => {
  const [sortedClassroom, isSorting] = useSortedClassroom(classroom);
  const [updatedClassroom, setUpdatedClassroom] = useState(null);
  const [isCopying, setIsCopying] = useState(true);

  useEffect(() => {
    setIsCopying(true);
    setUpdatedClassroom(cloneDeep(sortedClassroom));
    setIsCopying(updatedClassroom === null);
  }, [sortedClassroom]);

  return [updatedClassroom, sortedClassroom, isCopying, isSorting, setUpdatedClassroom];
}