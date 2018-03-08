import * as React from "react";

const Loading = (props:any) => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else {
    return null;
  }
};

export default Loading;