import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { signOut as signOutApi } from "../api/auth";
import BlockUi from "./BlockUi";

function SignOut() {
  const { signOut: useSignOut } = useAuth();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () =>
      useSignOut({
        onSignOut: () => navigate("/login"),
      }),
  });
  return (
    <BlockUi className={"mt-1"} blocked={isLoading}>
      <button
        onClick={mutate}
        className="w-full mt-1 text-white rounded bg-zinc-900 disabled:opacity-5 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        signOut
      </button>
    </BlockUi>
  );
}

export default SignOut;
