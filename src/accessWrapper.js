import React from "react";
import { useSelector } from 'react-redux';

const AccessWrapper = (WrappedComponent, ALLOWED_ACCESSES) => {

  // const HOC = () => {
    const user = useSelector((state) => state);
    console.log(">>>>>>user", user);

    let isAuthorized = !ALLOWED_ACCESSES?.length
    for (let i=0; i<user?.accesses?.length; i++) {
      if (ALLOWED_ACCESSES?.includes(user?.accesses[i])) {
        isAuthorized = true;
        break;
      }
    }

    console.log(">>>>>>>>>>>>Aulth", isAuthorized);
    return isAuthorized ? <WrappedComponent /> : <div>You Don't Have Access</div>
  // };

  // return HOC();
}

export default AccessWrapper;
