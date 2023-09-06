//External lib imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Internal lib imports
import Layout from '../../../layout/Layout';
import {
  useSessionCreateMutation,
  useSessionListQuery,
  useSessionUpdateMutation,
} from '../../../redux/services/sessionService';
import { formatDate } from '../../../utils/DateFormatter';

const CreateUpdateSession = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    sessionName: '',
    sessionYear: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allSession } = useSessionListQuery();
  const [SessionCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useSessionCreateMutation();
  const [SessionUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useSessionUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allSession) {
      setDetails(allSession?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allSession]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        sessionName: yup.string().required(t('session name is required')),
        sessionYear: yup.string().required(t('session year is required')),
      })
    ),
  });

  useEffect(() => {
    if (details) {
      reset(details);
    }
  }, [details]);

  /*
   * form handle submit
   */
  const submitForm = ({ sessionName, sessionYear }) => {
    const postBody = {
      sessionName,
      sessionYear,
    };
    if (!objectID) {
      SessionCreate(postBody);
    } else {
      SessionUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/elective-courses');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update session' : 'save session'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="sessionName">
                        <Form.Label>{t('session name')}</Form.Label>
                        <Controller
                          control={control}
                          name="sessionName"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.sessionName}
                              placeholder={t('session name of the session')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.sessionName && <Form.Text className="text-danger">{errors.sessionName.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="sessionYear">
                        <Form.Label>{t('session year')}</Form.Label>
                        <Controller
                          control={control}
                          name="sessionYear"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.sessionYear}
                              type="text"
                              size="sm"
                              placeholder={t('session year of the session')}
                            />
                          )}
                        />
                        {errors.sessionYear && <Form.Text className="text-danger">{errors.sessionYear.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <Button size="sm" className="mt-2" type="submit">
                        {createLoading || updateLoading ? <Spinner size="sm" color="light" /> : t('save change')}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default CreateUpdateSession;
