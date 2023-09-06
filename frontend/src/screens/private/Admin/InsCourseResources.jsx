//External lib imports
import { useState } from 'react';
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  ListGroup,
  Badge,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit, AiOutlineFolderView } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

//Internal lib imports
import Layout from '../../../layout/Layout';

import Table from '../../../components/Table/Table';
import AleartMessage from '../../../helpers/AleartMessage';
import DateFormatter from '../../../utils/DateFormatter';
import Upload from '../../../components/Upload';
import {
  useInsCoursesDeleteMutation,
  useInsCoursesListQuery,
  useInsCoursesUpdateMutation,
} from '../../../redux/services/inccoursesService';
import pdfImg from '../../../assets/images/pdf.png';

const InsCourseResources = () => {
  const { t } = useTranslation();
  const { data: InsCoursess, isLoading } = useInsCoursesListQuery();
  const [InsCoursesDelete] = useInsCoursesDeleteMutation();
  const [InsCoursesUpdate] = useInsCoursesUpdateMutation();
  const data = InsCoursess?.data || [];

  const { id, uniqueId } = useParams();
  const course = data.find((item) => item.id === id);

  const [modalShow, setModalShow] = useState(false);
  const [folderCreateUpdateModalShow, setFolderCreateUpdateModalSHow] = useState(false);

  const deleteItem = (id) => {
    AleartMessage.Delete(id, InsCoursesDelete);
  };

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col className="d-flex justify-content-between p-2" sm={12}>
                <h5>{t(`${course && course?.coursesHistory.find((i) => i.id == uniqueId).title} folder`)}</h5>
                <div>
                  <Button className="mx-2" size="sm" variant="primary" onClick={() => setModalShow(true)}>
                    {t(' upload')}
                  </Button>
                </div>
              </Col>
              <Col sm={12}>
                {isLoading ? (
                  <Spinner size="lg" variant="primary" />
                ) : data?.length ? (
                  <>
                    <Row>
                      {course?.resources
                        ?.filter((i) => i.folderId === uniqueId)
                        ?.map((i) => (
                          <Col xs={2} className="m-3">
                            {i?.url.endsWith('pdf') ? (
                              <a href={i.url} download>
                                <Image
                                  src={pdfImg}
                                  rounded
                                  style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                                />
                              </a>
                            ) : (
                              i.type === 'image' && (
                                <a href={i.url} download>
                                  <Image
                                    src={i.url}
                                    rounded
                                    style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                                  />
                                </a>
                              )
                            )}

                            {i.type === 'video' && (
                              <video style={{ height: '200px', width: '200px', objectFit: 'cover' }} controls>
                                <source src={i.url} type="video/mp4" />
                              </video>
                            )}
                          </Col>
                        ))}
                    </Row>
                  </>
                ) : (
                  t('no data found')
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Upload
          modalData={{ show: modalShow, onHide: () => setModalShow(false) }}
          course={course}
          submitHandler={InsCoursesUpdate}
          folderId={uniqueId}
        />
      </Container>
    </Layout>
  );
};

export default InsCourseResources;
