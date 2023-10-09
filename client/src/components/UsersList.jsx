import React from "react";
import { getAllUsers } from "../api/user";
import { useQuery } from "react-query";
import BlockUi from "./BlockUi";
function UsersList() {
  const { data, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  return (
    <div>
      <h1>Users :</h1>
      {isLoading ? (
        <BlockUi blocked={true}></BlockUi>
      ) : (
        data?.data?.data?.map((user, index) => (
          <span key={index + 1} className="block">
            {user.email}
          </span>
        ))
      )}
    </div>
  );
}

export default UsersList;
