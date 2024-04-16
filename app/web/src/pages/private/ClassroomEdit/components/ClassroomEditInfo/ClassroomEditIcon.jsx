import React from "react";
import { CardImg } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../../API/Paths";
import { DEFAULT_CLASSROOM_ICON_PATH } from "../../../../../constants/Image/ImageConstants";

const ClassroomEditIcon = ({ icon, updatedClassroom, handleClassroomFileChange }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <input type="file" id="fileInput" className="d-none" accept="image/*"
             onChange={ handleClassroomFileChange }/>
      <label htmlFor="fileInput">
        <CardImg
          src={ icon || (updatedClassroom.icon ? `${ IMAGE_PATH }/${ updatedClassroom.icon.uuid }` : DEFAULT_CLASSROOM_ICON_PATH) }
          alt="Icon"
          className="p-0 btn-light border border-info rounded"
          style={ { height: "80px", width: "80px", alignContent: "center", cursor: "pointer" } }
        />
      </label>
    </div>
  );
};

export default ClassroomEditIcon;