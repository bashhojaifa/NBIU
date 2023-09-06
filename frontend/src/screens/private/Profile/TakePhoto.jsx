//External Lib Import
import { useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Webcam from 'react-webcam';

const TakePhoto = () => {
  let cameraRef = useRef();
  const [cameraErr, setCameraErr] = useState(false);

  return (
    <div>
      <Row className="d-flex text-center justify-content-center">
        <Col className="text-center " md={4} sm={12} lg={4}>
          {/* <img className={this.state.PreviewSpinner + ' w-50'} src={this.state.spinner} /> */}
          <canvas className="canvasClass" id="canvasID" />
        </Col>
        <Col className="text-center" md={4} sm={12} lg={4}>
          {/* <img id="PersonPhoto" className="preview-img" src={this.state.photoSrc} />
          <button onClick={this.next} className="btn m-3 btn-block btn-danger">
            Next
          </button> */}
        </Col>
      </Row>
      <Row className="d-flex  justify-content-center">
        <Col className="text-center  p-3" md={4} sm={12} lg={4}>
          <Webcam
            onUserMediaError={() => setCameraErr(true)}
            ref={cameraRef}
            screenshotFormat="image/jpeg"
            audio={false}
            className="WebcamClass"
          />
        </Col>
      </Row>
    </div>
  );
};

export default TakePhoto;
