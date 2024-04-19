import { useEffect, useMemo, useState } from "react";

export const useSortedStudents = (students) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedStudents = useMemo(() => {
    setIsSorting(true);

    const sortedStudents = [...students];
    sortedStudents.sort((a, b) => {
      if (a.username !== b.username) {
        return a.username.localeCompare(b.username);
      } else {
        return a.email.localeCompare(b.email);
      }
    });

    setIsSorting(false);
    return sortedStudents;
  }, [students]);

  return [sortedStudents, isSorting];
};

export const useUpdatedStudents = (students) => {
  const [sortedStudents, isSorting] = useSortedStudents(students);
  const [updatedStudents, setUpdatedStudents] = useState(null);
  const [isCopying, setIsCopying] = useState(true);

  useEffect(() => {
    setIsCopying(true);
    setUpdatedStudents(sortedStudents);
    setIsCopying(false);
  }, [sortedStudents]);

  return [updatedStudents, sortedStudents, isCopying, isSorting, setUpdatedStudents];
}