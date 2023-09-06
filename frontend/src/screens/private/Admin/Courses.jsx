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
import { useCoursesDeleteMutation, useCoursesListQuery } from '../../../redux/services/coursesService';
import Table from '../../../components/Table/Table';
import AleartMessage from '../../../helpers/AleartMessage';
import DateFormatter from '../../../utils/DateFormatter';
import CoursesDetailsModal from './CoursesDetailsModal';
import exportDataJson from '../../../utils/exportDataJson';

const Courses = () => {
  const { t } = useTranslation();

  const [singleCourses, setSingleCourses] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: Coursess, isLoading } = useCoursesListQuery();
  const [CoursesDelete] = useCoursesDeleteMutation();
  const data = Coursess?.data || [];

  const deleteItem = (id) => {
    AleartMessage.Delete(id, CoursesDelete);
  };
  const handleQuickView = (d) => {
    setSingleCourses(d);
    handleShow();
  };

  const columns = [
    {
      Header: t('courses code'),
      accessor: (d) => <span className="ms-1"> {d.coursesCode}</span>,
      sort: true,
    },
    {
      Header: t('courses name'),
      accessor: (d) => <span className="ms-1"> {d.coursesName}</span>,
      sort: true,
    },
    {
      Header: t('courses instructor'),
      accessor: (d) => <span className="ms-1"> {d.coursesInstructor}</span>,
      sort: true,
    },
    {
      Header: t('seats limit'),
      accessor: (d) => <span className="ms-1"> {d.seatsLimit}</span>,
      sort: true,
    },
    {
      Header: t('registration deadline'),
      accessor: (d) => <span className="ms-1"> {DateFormatter(d.registrationDeadline)}</span>,
      sort: true,
    },
    {
      Header: t('created at'),
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
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('edit')}</Tooltip>}
          >
            <Link to={`/courses-create-update?id=${d?.id}`}>
              <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1">
                <AiOutlineEdit />
              </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('delete')}</Tooltip>}
          >
            <Button variant="danger" style={{ padding: '5px 10px' }} onClick={() => deleteItem(d.id)}>
              <BsTrash />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('enrolled student')}</Tooltip>}
          >
            <Link to={`/enrolled-student?id=${d?.id}`}>
              <Button variant="info" style={{ padding: '5px 10px' }}>
                <AiOutlineFolderView />
              </Button>
            </Link>
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
          <h5>{t('courses')}</h5>

          <div>
            <Link to={'/courses-create-update'}>
              <Button size="sm" variant="primary">
                {t('create courses')}
              </Button>
            </Link>
            <Button
              className="mx-2"
              size="sm"
              variant="primary"
              onClick={() => exportDataJson(data, 'courses-report', 'xls')}
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
      <CoursesDetailsModal singleCourses={singleCourses} show={show} handleClose={handleClose} />
    </>
  );
};

export default Courses;
