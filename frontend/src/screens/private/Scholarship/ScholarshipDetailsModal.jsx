//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ScholarshipDetailsModal = ({ show, handleClose, singleScholarship }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('student id')}: {singleScholarship?.studentID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('subject')}: {singleScholarship?.subject}
        </p>
        <p>
          {t('scholarship type')}: {singleScholarship?.scholarshipType}
        </p>
        <p>
          {t('description')}: {singleScholarship?.description}
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

export default ScholarshipDetailsModal;
