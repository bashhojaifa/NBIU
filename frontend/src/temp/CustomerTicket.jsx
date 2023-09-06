//External lib imports
import { Row, Col, Container, Button, Card, ListGroup, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit } from 'react-icons/ai';

//Internal lib imports
import AppNavigation from '../components/AppNavigation';
import { useTicketListQuery } from '../redux/services/ticketService';
import Table from '../components/Table/Table';
import { BsFillReplyFill, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import DateFormatter from '../utils/DateFormatter';

const CustomerTicket = () => {
  const { t } = useTranslation();
  const { data } = useTicketListQuery();

  const deleteItem = (id) => {};

  const columns = [
    {
      Header: '#',
      accessor: (_, index) => index + 1,
      sort: true,
    },
    {
      Header: t('student id'),
      accessor: (d) => <span className="ms-1"> {d.studentID}</span>,
      sort: true,
    },
    {
      Header: t('subject'),
      accessor: (d) => d?.subject,
      sort: true,
    },
    {
      Header: t('create date'),
      accessor: (d) => DateFormatter(d?.createdAt),
      sort: true,
    },
    {
      Header: t('update date'),
      accessor: (d) => DateFormatter(d?.updatedAt),
      sort: true,
    },
    {
      Header: t('status'),
      accessor: (d) => (
        <div className="bodySmall">
          <Badge bg="primary" pill>
            <span className="ms-1">{t(d?.status)}</span>
          </Badge>
        </div>
      ),
      sort: true,
    },
    {
      Header: t('action'),
      accessor: (d) => (
        <div className="bodySmall">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">{t('replay')}</Tooltip>}
          >
            <Link to={`/customer-ticket-reply?id=${d?.id}`}>
              <Button variant="primary" style={{ padding: '5px 10px' }} className="me-1">
                <BsFillReplyFill />
              </Button>
            </Link>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const sizePerPageList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '25',
      value: 25,
    },
    {
      text: 'All',
      value: data?.length,
    },
  ];

  return (
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-wrapper">
          <div className="auth-content">
            <AppNavigation title={t('create ticket')} />
            <div className="mt-3">
              <Card>
                <Card.Body>
                  <Row>
                    <Col className="d-flex justify-content-between p-2" sm={12}>
                      <h5>{t('my tickets')}</h5>
                      <Link to={'/customer/create-ticket'}>
                        <Button size="sm" variant="primary">
                          {t('create ticket')}
                        </Button>
                      </Link>
                    </Col>
                    <Col sm={12}>
                      {data?.length ? (
                        <Table
                          columns={columns}
                          data={data}
                          pageSize={5}
                          sizePerPageList={sizePerPageList}
                          isSortable={true}
                          pagination={true}
                        />
                      ) : (
                        t('No Data Found')
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTicket;
