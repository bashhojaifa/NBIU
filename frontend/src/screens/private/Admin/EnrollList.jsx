//External lib imports
import { useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr';

//Internal lib imports
import Layout from '../../../layout/Layout';
import { useEnrollListQuery } from '../../../redux/services/enrolledService';
import Table from '../../../components/Table/Table';
import AleartMessage from '../../../helpers/AleartMessage';
import DateFormatter from '../../../utils/DateFormatter';
import EnrollDetailsModal from './EnrollDetailsModal';
import exportDataJson from '../../../utils/exportDataJson';

const EnrollList = () => {
  const [singleEnroll, setSingleEnroll] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();
  const { data: Enrolls, isLoading } = useEnrollListQuery();
  const data = Enrolls?.data || [];

  const handleQuickView = (d) => {
    setSingleEnroll(d);
    handleShow();
  };

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('courses name'),
      accessor: (d) => <span className="ms-1"> {d?.coursesID?.coursesName}</span>,
      sort: true,
    },
    {
      Header: t('student name'),
      accessor: (d) => <span className="ms-1"> {d?.studentID?.name}</span>,
      sort: true,
    },
    {
      Header: t('student email'),
      accessor: (d) => <span className="ms-1"> {d?.studentID?.email}</span>,
      sort: true,
    },
    {
      Header: t('reg date/time'),
      accessor: (d) => <span className="ms-1"> {DateFormatter(d.createdAt)}</span>,
      sort: true,
    },
    {
      Header: t('action'),
      accessor: (d) => (
        <div className="bodySmall">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('view')}</Tooltip>}
          >
            <Button variant="primary" style={{ padding: '5px 10px' }} onClick={() => handleQuickView(d)}>
              <AiOutlineFolderView />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const sizePerPageList = [
    {
      text: t('5'),
      value: 5,
    },
    {
      text: t('10'),
      value: 10,
    },
    {
      text: t('25'),
      value: 25,
    },
    {
      text: t('all'),
      value: data?.length,
    },
  ];

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-between p-2" sm={12}>
          <h5>{t('Enroll')}</h5>
          <div>
            <Button
              className="mx-2"
              size="sm"
              variant="primary"
              onClick={() => exportDataJson(data, 'enroll-report', 'xls')}
            >
              {t('download report')}
            </Button>
          </div>
        </Col>
        <Col sm={12}>
          {isLoading ? (
            <Spinner size="lg" variant="primary" />
          ) : data?.length ? (
            <Table
              columns={columns}
              data={data}
              pageSize={5}
              sizePerPageList={sizePerPageList}
              isSortable={true}
              pagination={true}
            />
          ) : (
            t('no data found')
          )}
        </Col>
      </Row>
      <EnrollDetailsModal singleEnroll={singleEnroll} show={show} handleClose={handleClose} />
    </>
  );
};

export default EnrollList;
