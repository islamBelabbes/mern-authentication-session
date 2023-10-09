import React, { useState } from "react";
import BlockUi from "./BlockUi";
import { useAuth } from "../context/authProvider";
import SignOut from "./signOut";
import { Link } from "react-router-dom";
function Account() {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  const clickHandler = () => setUserData(user);

  return (
    <div className="w-[500px] flex flex-col justify-center border-amber-200 border p-3 overflow-x-auto">
      <h1 className="text-center">Hey, {user?.email}</h1>
      <Link to="/users">users list</Link>
      <SignOut />
      <BlockUi blocked={false} className={"mt-1"}>
        <button
          onClick={clickHandler}
          className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed"
        >
          Get Data
        </button>
        <span>{userData && JSON.stringify(userData)}</span>
      </BlockUi>
    </div>
  );
}

export default Account;
