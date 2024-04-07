import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonService from "../../../../API/Lesson/LessonService";
import ModuleService from "../../../../API/Module/ModuleService";
import { useFetching } from "../../../../hooks/useFetching";
import LessonForm from "./LessonForm";

const Lesson = () => {
  const params = useParams();
  const [lesson, setLesson] = useState({});
  const [moduleOrder, setModuleOrder] = useState(-1);
  const navigate = useNavigate();

  const [fetchLesson, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const lesson = await LessonService.getLesson(params.id);
      setLesson(lesson);
      const module = await ModuleService.getBaseModule(lesson.module_id);
      setModuleOrder(module.order);
    }
  )

  useEffect(() => {
    fetchLesson();
  }, []);

  return (
    <>
      { fetchingError || lesson.detail ? (
        navigate("/error", { replace: true })
      ) : (
        <LessonForm
          moduleOrder={ moduleOrder }
          lesson={ lesson }
          isLoading={ isFetchingLoading }
        />
      ) }
    </>
  );
};

export default Lesson;