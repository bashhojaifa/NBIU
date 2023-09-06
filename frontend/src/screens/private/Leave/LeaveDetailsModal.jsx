//External lib imports
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LeaveDetailsModal = ({ show, handleClose, singleLeave }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('subject')}: {singleLeave.subject}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('reason')}: {singleLeave.reason}
        </p>
        <p>
          {t('start date')}: {singleLeave.startDate}
        </p>
        <p>
          {t('end date')}: {singleLeave.endDate}
        </p>
        <p>
          {t('duration')}: {singleLeave.duration}
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

export default LeaveDetailsModal;
