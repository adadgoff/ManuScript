import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonService from "../../../API/Lesson/LessonService";
import { useFetching } from "../../../hooks/useFetching";
import LessonEditForm from "./Lesson/LessonEditForm";

const LessonEdit = () => {
  const params = useParams();
  const [lesson, setLesson] = useState([]);
  const navigate = useNavigate();

  const [fetchLesson, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const lesson = await LessonService.getLessonEdit(params.id);
      setLesson(lesson);
    }
  );

  useEffect(() => {
    fetchLesson();
  }, []);

  return (
    <>
      { fetchingError || lesson.detail ? (
        navigate("/error", { replace: true })
      ) : (
        <LessonEditForm
          lesson={ lesson }
          setLesson={ setLesson }
          isLoading={ isFetchingLoading }/>
      ) }
    </>
  );
};

export default LessonEdit;