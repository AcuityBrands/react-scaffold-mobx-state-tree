import * as React from "react";
import { Button, Row, Col } from 'antd';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flex: 1, background:'#f7f7f7'}}>
        <Row type="flex" justify="center" align="middle">
          <Col xs={23} sm={20} md={18} lg={16}>
            <div className="card">
              <h1>Oh, Hello 404</h1>
              <h3 className="mt10">Whatever you were trying to do, it didn't work</h3>
              <p className="mt20">
                Once upon a midnight dreary, While I websurfed, weak and weary,
                Over many a strange and spurious websites or blogs galore,
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
                begged, no longer seated, "Give me back my hrefs once more!"
              </p>
              <p className="mt20">
                Then, in answer to my query, Through the net I loved so dearly,
                Came its answer, dark and dreary: Quoth the server, 404
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}