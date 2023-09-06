//External lib imports
import { useState } from 'react';
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

//Internal lib imports
import Layout from '../../../layout/Layout';
import Table from '../../../components/Table/Table';
import { useStudentListQuery } from '../../../redux/services/profileService';

const Students = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useStudentListQuery();

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('student id'),
      accessor: (d) => <span className="ms-1"> {d.id}</span>,
      sort: true,
    },
    {
      Header: t('name'),
      accessor: (d) => <span className="ms-1"> {d.name}</span>,
      sort: true,
    },
    {
      Header: t('email'),
      accessor: (d) => <span className="ms-1"> {d.email}</span>,
      sort: true,
    },
    {
      Header: t('address'),
      accessor: (d) => <span className="ms-1"> {d.address}</span>,
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
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
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
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Students;
