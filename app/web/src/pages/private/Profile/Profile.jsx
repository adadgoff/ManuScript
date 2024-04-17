import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../API/Auth/AuthService";
import UserService from "../../../API/User/UserService";
import Loader from "../../../components/UI/Loader/Loader";
import { LOADING_TEXT } from "../../../components/UI/Loader/LoaderConstants";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useFetching } from "../../../hooks/useFetching";
import ProfileEdit from "./components/ProfileEdit";
import ProfileInfo from "./components/ProfileInfo";

const Profile = () => {
  const { setToken } = useContext(AuthContext);

  const [authUser, setAuthUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  const [fetchAuthUser, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const authUser = await UserService.getProfile();
      setAuthUser(authUser);
      setUpdatedUser({ ...authUser, password: "", new_password: "", confirm_password: "" });
    }
  );

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();

    setToken(null);
    localStorage.removeItem("token");
    await AuthService.logout();

    navigate("/login", { replace: true });
  }

  return (
    <>
      { fetchingError || authUser.detail ? (
        console.log(authUser.detail)
        // navigate("/error", { replace: true })
      ) : (
        isFetchingLoading ? (
          <Loader title={ LOADING_TEXT }/>
        ) : (
          <Container className="my-3">
            <h1 className="text-bg-info text-center text-white rounded p-3 my-3 fs-4 fw-medium">Профиль</h1>

            <ProfileInfo user={ authUser }/>

            <ProfileEdit updatedUser={ updatedUser }
                         setUpdatedUser={ setUpdatedUser }
                         setAuthUser={ setAuthUser }/>

            <Button
              className="mt-4 w-100 btn-warning fw-medium fs-5 p-2"
              children={ "Выйти из аккаунта" }
              onClick={ handleLogout }/>
          </Container>
        )
      ) }
    </>
  );
};
export default Profile;