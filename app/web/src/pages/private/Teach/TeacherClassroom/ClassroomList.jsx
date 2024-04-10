import React, { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomConstants";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { CLASSROOM_EMPTY_TEXT, CLASSROOM_TITLE_HINT } from "../../../../constants/Classroom/ClassroomConstants";
import { useSortedSearchedClassrooms } from "../../../../hooks/Classroom/useClassrooms";
import { TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = ({ ...props }) => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const [sortedSearchedClassrooms, isSorting] = useSortedSearchedClassrooms(props.classrooms, search);

  return (
    <Container className="my-3">
      <FloatingLabel controlId="searchInput" label={ CLASSROOM_TITLE_HINT } className="mb-3">
        <Form.Control type="text" placeholder="" onChange={ (event) => setSearch(event.target.value) }/>
      </FloatingLabel>

      <h1 className={ TITLE_CLASS_NAME }>{ props.title }</h1>

      <hr className="my-4"/>

      <Button
        children="Создать учебный класс"
        className="btn-success w-100 p-2 fw-medium fs-5"
      />

      <hr className="my-4"/>

      {
        props.isLoading ? (
          <Loader title={ LOADING_TEXT }/>
        ) : isSorting ? (
          <Loader title={ SORTING_TEXT }/>
        ) : sortedSearchedClassrooms.length !== 0 ? (
          sortedSearchedClassrooms.map(classroom => (
            <ClassroomItem
              onClick={ () => navigate(`/${ CLASSROOM_PREFIX }/${ classroom.id }`) }
              id={ classroom.id }
              title={ classroom.title }
              description={ classroom.description }
              icon={ classroom.icon }
              key={ classroom.id }
            />
          ))
        ) : (
          <h2 className="text-center border rounded p-3">{ CLASSROOM_EMPTY_TEXT }</h2>
        )
      }
    </Container>
  );
};

export default ClassroomList;