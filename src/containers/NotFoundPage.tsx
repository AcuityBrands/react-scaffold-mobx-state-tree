import * as React from "react";
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <Row type="flex" justify="center">
          <Col sm={24} md={17} lg={12}>
            <div className="card">
              <h1>404</h1>
              <h3 className="mt10">Whatever you were trying to do, it didn't work</h3>
              <p className="mt20">
                Once upon a midnight dreary, While I websurfed, weak and weary,
                Over many a strange and spurious website of data galore,
              </p>
              <p className="mt20">
                While I clicked my fav'rite bookmark, Suddenly there came a warning,
                And my heart was filled with mourning, Mourning for my dear amour.
              </p>
              <p className="mt20">
                'Tis not possible!, I pleaded, But my browser, so conceited, Remained
                blank, I then repeated, Just a blank and nothing more.
              </p>
              <p className="mt20">
                With a scream, I was defeated, For my cookies were deleted, So i
                begged, no longer seated, "Give me back my charts hardcore!"
              </p>
              <p className="mt20">
                Then, in answer to my query, Through the net I loved so dearly,
                Came its answer, dark and dreary: Quoth the server, 404
              </p>
              <p className="mt20">
                <Button><Link to="/">Take me back to where it's warm and safe</Link></Button>
                {/* <Link to="/">.</Link> */}
              </p>
            </div>
          </Col>
          <Col sm={24} md={5} lg={5} offset={1}>
            <h3 className="mt20">About This Page</h3>
            <p className="mt10 light">
              This is a catch-all page.  Go ahead, try throwing a random url into the browser
              and you'll be brought right back here.  BOOM!
            </p>
            <p className="mt10 light">
              Just in case you have a hard time navigating your way around, here's a poem 
              to brighten your mood.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}