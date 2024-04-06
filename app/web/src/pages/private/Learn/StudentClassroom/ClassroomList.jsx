import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOADING_TEXT } from "../../../../components/UI/Loader/consts";
import Loader from "../../../../components/UI/Loader/Loader";
import { CLASSROOM_PREFIX, EMPTY_TEXT, SORTING_TEXT, TITLE_HINT } from "../../../../constants/classrooms";
import { useSortedSearchedClassrooms } from "../../../../hooks/ClassroomHooks/useClassrooms";
import { TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = ({ ...props }) => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const [sortedSearchedClassrooms, isSorting] = useSortedSearchedClassrooms(props.classrooms, search);

  return (
    <Container className="my-3">
      <FloatingLabel controlId="searchInput" label={ TITLE_HINT } className="mb-3">
        <Form.Control type="text" placeholder="" onChange={ (event) => setSearch(event.target.value) }/>
      </FloatingLabel>

      <h1 className={ TITLE_CLASS_NAME }>{ props.title }</h1>

      {
        props.isLoading || isSorting ? (
          <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
        ) : (
          props.classrooms.length !== 0 ? (
            sortedSearchedClassrooms.map(classroom => (
              <ClassroomItem
                onClick={ () => navigate(`/${ CLASSROOM_PREFIX }/${ classroom.id }`) }
                title={ classroom.title }
                description={ classroom.description }
                icon={ classroom.icon }
                key={ classroom.id }
              />
            ))
          ) : (
            <h2 className="text-center">{ EMPTY_TEXT }</h2>
          )
        )
      }
    </Container>
  );
};

export default ClassroomList;