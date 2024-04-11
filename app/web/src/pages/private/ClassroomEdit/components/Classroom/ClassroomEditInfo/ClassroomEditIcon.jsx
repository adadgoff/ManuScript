import React from "react";
import { CardImg } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../../../API/Paths";
import { CLASSROOM_DEFAULT_IMAGE_UUID } from "../../../../../../constants/Classroom/ClassroomConstants";

const ClassroomEditIcon = ({ selectedFile, updatedClassroom, handleClassroomFileChange }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <input type="file" id="fileInput" className="d-none" accept="image/*"
             onChange={ handleClassroomFileChange }/>
      <label htmlFor="fileInput">
        <CardImg
          src={ selectedFile || `${ IMAGE_PATH }/${ updatedClassroom.icon ? updatedClassroom.icon.uuid : CLASSROOM_DEFAULT_IMAGE_UUID }` }
          alt="Icon"
          className="p-0 btn-light border border-info rounded"
          style={ { height: "80px", width: "80px", alignContent: "center", cursor: "pointer" } }
          onClick={ () => {
          } }
        />
      </label>
    </div>
  );
};

export default ClassroomEditIcon;