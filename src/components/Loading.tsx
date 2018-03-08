import * as React from "react";
import { Icon } from 'antd';

const Loading = (props:any) => {
  if (props.error) {
    return (
      <div className="blurb-container">
        <div className="blurb-wrapper">
          <Icon type="warning" /><br/>
          <p className="mt10">Oh snap! This didn't load properly.</p>
          <p className='small'>Perhaps refresh and try again?</p>
        </div>
      </div>
    )
  } else if (props.pastDelay) {
    return (
      <div className="blurb-container">
        <div className="blurb-wrapper">
          <Icon type="loading" /><br/>
          <p className="mt10">One moment while we get things ready.</p>
          <p className='small'>Any moment now...</p>
        </div>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div className="blurb-container">
        <div className="blurb-wrapper">
          <Icon type="clock-circle-o" /><br/>
          <p className="mt10">Tick-tock.  This is taking awhile...</p>
          <p className='small'>Perhaps refresh and try again?</p>
        </div>
      </div>
    )
  } else {
    return null;
  }
  
};

export default Loading;