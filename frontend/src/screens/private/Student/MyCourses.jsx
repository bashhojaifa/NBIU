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
import DateFormatter from '../../../utils/DateFormatter';
import exportDataJson from '../../../utils/exportDataJson.js';

const MyCourses = () => {
  const { t } = useTranslation();
  const { data: Enrolls, isLoading } = useEnrollListQuery();

  const data = Enrolls?.data || [];

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('courses code'),
      accessor: (d) => <span className="ms-1"> {d?.coursesID?.coursesCode}</span>,
      sort: true,
    },
    {
      Header: t('courses name'),
      accessor: (d) => <span className="ms-1"> {d?.coursesID?.coursesName}</span>,
      sort: true,
    },
    {
      Header: t('courses instructor'),
      accessor: (d) => <span className="ms-1"> {d?.coursesID?.coursesInstructor}</span>,
      sort: true,
    },
    {
      Header: t('enroll date/time'),
      accessor: (d) => <span className="ms-1"> {DateFormatter(d.createdAt)}</span>,
      sort: true,
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
    <Row>
      <Col className="d-flex justify-content-between p-2" sm={12}>
        <h5>{t('my courses')}</h5>
        <div>
          <Button
            className="mx-2"
            size="sm"
            variant="primary"
            onClick={() => exportDataJson(data, 'my-courses-report', 'xls')}
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
  );
};

export default MyCourses;
