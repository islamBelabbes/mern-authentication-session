import React from "react";
import BlockUi from "./BlockUi";
function Logout() {
  return (
    <BlockUi blocked={false} className={"mt-1"}>
      <button
        className="p-2 mt-1 text-white rounded bg-zinc-900 disabled:cursor-not-allowed"
        disabled={false}
      >
        logout
      </button>
    </BlockUi>
  );
}

export default Logout;
