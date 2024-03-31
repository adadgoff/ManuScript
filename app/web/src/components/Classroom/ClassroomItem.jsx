import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ClassroomItem.module.css"

const ClassroomItem = (id, title, description, iconUuid) => {
  const router = useNavigate()

  return (
    <div className={ classes.post }>
      <img className={classes.postImage} src={}/>
      <div className={ classes.postTitle }>
        { description }
      </div>

    </div>
  );
};

export default ClassroomItem;