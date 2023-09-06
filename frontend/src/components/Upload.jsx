import React, { useState } from 'react';
import useFileUpload from '../hooks/useFIleUpload';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './upload.css';

function Upload({ modalData, ...rest }) {
  const { t } = useTranslation();
  const { loading, upload, fileInfo } = useFileUpload();
  const [files, setFiles] = useState(null);
  const submitHandler = (files) => {
    upload(files)
      .then((result) => {
        const resourceData = result.map((item) => {
          return {
            folderId: rest.folderId,
            id: Date.now(),
            url: item.url,
            type: item.type,
          };
        });
        const data = {
          ...rest.course,
          resources: [...rest.course.resources, ...resourceData],
        };
        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;
        rest.submitHandler({ id: rest.course.id, postBody: data });
      })
      .catch((error) => console.log(error));
  };
  return (
    <Modal {...modalData} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{loading ? 'Uploading Please wait...' : 'Upload File'} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <>
            <div id="FileUpload">
              <div class="wrapper">
                <div class="upload">
                  <Form.Group controlId="formFile" className="mb-3 ">
                    <Form.Label>
                      <p>
                        <span class="upload__button">Browse</span>
                      </p>
                    </Form.Label>
                    <Form.Control
                      className="d-none"
                      type="file"
                      accept="image/*,video/*,pdf/*,pptx/*"
                      onChange={(e) => setFiles(e.target.files)}
                      multiple
                    />
                  </Form.Group>
                </div>
                {fileInfo.length
                  ? fileInfo.map((item) => (
                      <div class="uploaded uploaded--one">
                        <div class="file">
                          <div class="file__name d-flex px-3">
                            <p>{item.fileName}</p>
                            <i class="fas fa-times"></i>
                            {item.progress === 100 ? 'Upload completed' : `loading ${item.progress}%`}
                          </div>
                          <div class="progress px-1">
                            <div
                              class="progress-bar bg-success progress-bar-striped progress-bar-animated"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={modalData.onHide}>Close</Button>
        <Button className="mx-2" onClick={() => submitHandler(files)}>
          Submit{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Upload;
