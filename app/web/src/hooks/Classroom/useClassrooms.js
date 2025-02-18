import { useMemo, useState } from "react";

export const useSortedClassrooms = (classrooms) => {
  const [isSorting, setIsSorting] = useState(true);

  const sortedClassrooms = useMemo(() => {
    setIsSorting(true);
    const sortedClassrooms = [...classrooms].sort((a, b) => a.title.localeCompare(b.title));
    setIsSorting(false);
    return sortedClassrooms;
  }, [classrooms]);

  return [sortedClassrooms, isSorting];
};

export const useSortedSearchedClassrooms = (classrooms, search) => {
  const [sortedClassrooms, isSorting] = useSortedClassrooms(classrooms);

  const sortedSearchedClassrooms = useMemo(() => {
    return sortedClassrooms.filter(classroom => classroom.title.toLowerCase().includes(search.toLowerCase()));
  }, [sortedClassrooms, search]);

  return [sortedSearchedClassrooms, isSorting];
};