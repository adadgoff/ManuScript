import { useMemo } from "react";

export const useSortedClassrooms = (classrooms) => {
  return useMemo(() => {
    return [...classrooms].sort((a, b) => a.title.localeCompare(b.title));
  }, [classrooms]);
};

export const useSortedSearchedClassrooms = ((classrooms, search) => {
  const sortedClassrooms = useSortedClassrooms(classrooms);
  return useMemo(() => {
    return sortedClassrooms.filter(classroom => classroom.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, sortedClassrooms]);
})