import { useEffect, useMemo, useState } from "react";

export const useSortedTeachers = (teachers) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedTeachers = useMemo(() => {
    setIsSorting(true);

    const sortedTeachers = [...teachers];
    sortedTeachers.sort((a, b) => {
      if (a.username !== b.username) {
        return a.username.localeCompare(b.username);
      } else {
        return a.email.localeCompare(b.email);
      }
    });

    setIsSorting(false);
    return sortedTeachers;
  }, [teachers]);

  return [sortedTeachers, isSorting];
};

export const useUpdatedTeachers = (teachers) => {
  const [sortedTeachers, isSorting] = useSortedTeachers(teachers);
  const [updatedTeachers, setUpdatedTeachers] = useState(null);
  const [isCopying, setIsCopying] = useState(true);

  useEffect(() => {
    setIsCopying(true);
    setUpdatedTeachers(sortedTeachers);
    setIsCopying(false);
  }, [sortedTeachers]);

  return [updatedTeachers, sortedTeachers, isCopying, isSorting, setUpdatedTeachers];
}