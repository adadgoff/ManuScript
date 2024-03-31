import React from 'react';
import classes from "./NavigationBar.module.css";
import Button from "../UI/Button/Button";

const NavigationBar = () => {
  return (
    <div className={classes.navigationBar}>
      <Button>Преподавание</Button>
      <Button>Преподавание</Button>
      <Button>Языки</Button>
      <Button>Профиль</Button>
    </div>
  );
};

export default NavigationBar;