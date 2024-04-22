import React, { useEffect, useState } from "react";
import { Accordion, Alert, Container } from "react-bootstrap";
import LessonService from "../../../../API/Lesson/LessonService";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { useFetching } from "../../../../hooks/useFetching";
import CheckTable from "./CheckTable";

const CheckPage = ({ classroom, students }) => {
    const [lessonTasks, setLessonTasks] = useState({});

    const [fetchLessonSteps, isLessonStepsFetching, fetchingLessonStepsError] = useFetching(
      async () => {
        for (const module of classroom.modules) {
          for (const lesson of module.lessons) {
            const lessonSteps = await LessonService.getLessonTasks(lesson.id);
            setLessonTasks((prevLessonSteps) => ({
              ...prevLessonSteps,
              [lesson.id]: lessonSteps
            }));
          }
        }

        setLessonTasks(lessonTasks.map(lesson => {
          lesson.steps.sort((a, b) => a.order - b.order);
          return lesson;
        }));
      }
    );

    useEffect(() => {
      fetchLessonSteps();
    }, []);

    return (
      <Container className="my-3">
        <h1 className="text-bg-primary text-center text-white rounded p-3 my-3 fs-4 fw-medium">
          { `Проверка работ: ${ classroom.title }` }
        </h1>

        { classroom.modules && classroom.modules.length !== 0 &&
          <>
            <Alert variant="secondary" dismissible className="fw-medium fs-5">
              💡 Для просмотра задания нажмите на решётку # соответствующего номера!
            </Alert>

            <Alert variant="secondary" dismissible className="fw-medium fs-5">
              💡 Для просмотра работы учащегося нажмите на галочку/крестик ✅/❌!
            </Alert>
          </>
        }

        { classroom.modules && classroom.modules.length > 0 ? (
          classroom.modules.map((module, moduleIndex) =>
            <Accordion className="border border-primary rounded my-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{ moduleIndex + 1 }. { module.title }</Accordion.Header>

                <Accordion.Body className="py-0">
                  { module.lessons && module.lessons.map((lesson, lessonIndex) =>
                    <Accordion className="border border-primary-subtle rounded my-3">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>{ moduleIndex + 1 }.{ lessonIndex + 1 } { lesson.title }</Accordion.Header>
                      </Accordion.Item>

                      <Accordion.Body>
                        {
                          !(lesson.id in lessonTasks) ? (
                            <Loader title={ LOADING_TEXT }/>
                          ) : (lessonTasks[lesson.id].steps.length) ? (
                            <CheckTable lesson={ lesson }
                                        students={ students }
                                        lessonTasks={ lessonTasks }
                                        classroom={ classroom }/>
                          ) : (
                            <h6
                              className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 my-0">
                              Заданий в уроке нет
                            </h6>
                          )
                        }
                      </Accordion.Body>
                    </Accordion>
                  ) }
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        ) : (
          <h5 className="text-center bg-info-subtle border border-primary-subtle border-2 rounded p-3 mt-3">
            Модулей в учебном классе нет...
          </h5>
        ) }
      </Container>
    );
  }
;

export default CheckPage;