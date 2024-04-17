import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../API/User/UserService";
import { useFetching } from "../../../hooks/useFetching";
import ProfileInfo from "../Profile/components/ProfileInfo";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [fetchUser, isFetchingLoading, fetchingError] = useFetching(
    async () => {
      const user = await UserService.getUser(params.uuid);
      setUser(user);
    }
  );

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      { fetchingError || user.detail ? (
        navigate("/error", { replace: true })
      ) : (
        <Container className="my-3">
          <h1 className="text-bg-info text-center text-white rounded p-3 my-3 fs-4 fw-medium">Просмотр пользователя</h1>

          <ProfileInfo user={ user }/>
        </Container>
      ) }
    </>
  );
};

export default User;