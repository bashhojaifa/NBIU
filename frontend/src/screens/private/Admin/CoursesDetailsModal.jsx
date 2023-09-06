//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CoursesDetailsModal = ({ show, handleClose, singleCourses }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('courses code')}: {singleCourses.coursesCode}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('courses name')}: {singleCourses.coursesName}
        </p>
        <p>
          {t('courses instructor')}: {singleCourses.coursesInstructor}
        </p>
        <p>
          {t('seats limit')}: {singleCourses.seatsLimit}
        </p>
        <p>
          {t('registration deadline')}: {singleCourses.registrationDeadline}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoursesDetailsModal;
