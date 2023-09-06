import React, { useState } from 'react';
import {
  useInsCoursesDeleteMutation,
  useInsCoursesListQuery,
  useInsCoursesUpdateMutation,
} from '../../../redux/services/inccoursesService';
import { Button, Container, Form, Modal } from 'react-bootstrap';

function CreateUpdateFolder(props) {
  const [folderName, setFolderName] = useState('');
  const { data: InsCoursess, isLoading } = useInsCoursesListQuery();
  const [InsCoursesDelete] = useInsCoursesDeleteMutation();
  const [InsCoursesUpdate, { isSuccess }] = useInsCoursesUpdateMutation();
  const data = InsCoursess?.data || [];

  const onSubmit = () => {
    const data = {
      ...props.course,
      coursesHistory: [
        ...props.course.coursesHistory,
        {
          title: folderName,
          createdAt: new Date().toISOString(),
          id: Date.now(),
        },
      ],
    };
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    console.log(data);
    InsCoursesUpdate({ id: props.course.id, postBody: data });
  };

  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={props.show && !isSuccess}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Folder </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 ">
          <Form.Control type="text" onChange={(e) => setFolderName(e.target.value)} value={folderName} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" onClick={props.onHide}>
          Close
        </Button>
        <Button size="sm" className="mx-2" onClick={onSubmit}>
          Submit{' '}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateUpdateFolder;
