import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CLASSROOM_PREFIX } from "../../../../API/Classroom/ClassroomPrefix";
import Loader from "../../../../components/UI/Loader/Loader";
import { LOADING_TEXT, SORTING_TEXT } from "../../../../components/UI/Loader/LoaderConstants";
import { CLASSROOM_EMPTY_TEXT, CLASSROOM_TITLE_HINT } from "../../../../constants/Classroom/ClassroomConstants";
import { useSortedSearchedClassrooms } from "../../../../hooks/Classroom/useClassrooms";
import { TITLE_CLASS_NAME } from "../../../../styles/Classroom/ClassroomStyles";
import ClassroomInvitePanel from "./ClassroomInvitePanel";
import ClassroomItem from "./ClassroomItem";

const ClassroomList = ({ fetchClassrooms, ...props }) => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const [sortedSearchedClassrooms, isSorting] = useSortedSearchedClassrooms(props.classrooms, search);

  return (
    <Container className="my-3">
      <FloatingLabel controlId="searchInput" label={ CLASSROOM_TITLE_HINT } className="mb-3">
        <Form.Control type="text" placeholder="" onChange={ (event) => setSearch(event.target.value) }/>
      </FloatingLabel>

      <h1 className={ TITLE_CLASS_NAME }>{ props.title }</h1>

      <hr className="my-4 mb-2"/>

      <ClassroomInvitePanel fetchClassrooms={ fetchClassrooms }/>

      <hr className="my-4 mt-2"/>

      {
        props.isLoading || isSorting ? (
          <Loader title={ props.isLoading ? LOADING_TEXT : SORTING_TEXT }/>
        ) : sortedSearchedClassrooms.length !== 0 ? (
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
          <h2 className="text-center border rounded p-3">{ CLASSROOM_EMPTY_TEXT }</h2>
        )
      }
    </Container>
  );
};

export default ClassroomList;