import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => --current);
    }, 1000);

    // redirect once count is equal to 0
    count === 0 && history.push("/");

    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <h2>
        Redirecting you in <span className="text-danger">{count}</span> seconds
      </h2>
    </div>
  );
};

export default LoadingToRedirect;
