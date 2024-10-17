import { useSelector } from "react-redux";

import "./loading.css";

const Loading = () => {
  const loading = useSelector((state: any) => state.general.loading);

  return (
    loading && (
      <div className="loading">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    )
  );
};

export default Loading;
