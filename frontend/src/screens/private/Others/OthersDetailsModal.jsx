//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const OthersDetailsModal = ({ show, handleClose, singleOthers }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('student id')}: {singleOthers?.studentID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('subject')}: {singleOthers?.subject}
        </p>
        <p>
          {t('scholarship type')}: {singleOthers?.scholarshipType}
        </p>
        <p>
          {t('description')}: {singleOthers?.description}
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

export default OthersDetailsModal;
