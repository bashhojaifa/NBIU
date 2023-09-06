//External lib imports
import { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { GrStatusGood } from 'react-icons/gr';

//Internal lib imports
import Layout from '../../../layout/Layout';
import { useCoursesListQuery } from '../../../redux/services/coursesService';
import Table from '../../../components/Table/Table';
import AleartMessage from '../../../helpers/AleartMessage';
import DateFormatter from '../../../utils/DateFormatter';
import { useEnrollCreateMutation, useEnrollListQuery } from '../../../redux/services/enrolledService';
import { useProfileDetailsQuery } from '../../../redux/services/profileService';
import exportDataJson from '../../../utils/exportDataJson';

const AvailableCourses = () => {
  const { t } = useTranslation();
  const { data: Coursess, isLoading } = useCoursesListQuery();
  const { data: Enrolls } = useEnrollListQuery();
  const [enrollCreate] = useEnrollCreateMutation();
  const [list, setList] = useState([]);
  const data = Coursess?.data || [];
  const { data: profileDetails } = useProfileDetailsQuery();

  const enrolled = (coursesID) => {
    AleartMessage.Update(coursesID, enrollCreate);
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
            overlay={<Tooltip id="button-tooltip">{t('enrolled courses')}</Tooltip>}
          >
            <Button
              variant={Enrolls?.data?.find((i) => i.coursesID.id === d.id) ? 'info' : 'primary'}
              style={{ padding: '5px 10px' }}
              onClick={() => enrolled(d.id)}
              disabled={Enrolls?.data?.find((i) => i.coursesID.id === d.id)}
            >
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

  useEffect(() => {
    const filterCourses = Coursess?.data.filter((c) => c?.allowSessions?.indexOf(profileDetails?.data?.session) !== -1);

    console.log(filterCourses);

    setList(filterCourses);
  }, [Coursess, profileDetails]);

  return (
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
            onClick={() => exportDataJson(data, 'available-courses-report', 'xls')}
          >
            {t('download report')}
          </Button>
        </div>
      </Col>
      <Col sm={12}>
        {isLoading ? (
          <Spinner size="lg" variant="primary" />
        ) : list?.length ? (
          <Table
            columns={columns}
            data={list}
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
  );
};

export default AvailableCourses;
