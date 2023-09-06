//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DateFormatter from '../../../utils/DateFormatter';

const EnrollDetailsModal = ({ show, handleClose, singleEnroll }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('student name')}: {singleEnroll?.studentID?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('student email')}: {singleEnroll?.studentID?.email}
        </p>
        <p>
          {t('reg date/time')}: {DateFormatter(singleEnroll.createdAt)}
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

export default EnrollDetailsModal;
