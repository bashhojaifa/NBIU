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
import { useOthersCreateMutation, useOthersListQuery, useOthersUpdateMutation } from '../../../redux/services/othersService';

const CreateUpdateOthers = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    subject: '',
    description: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allOthers } = useOthersListQuery();
  const [OthersCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useOthersCreateMutation();
  const [OthersUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useOthersUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allOthers) {
      setDetails(allOthers?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allOthers]);

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
        subject: yup.string().required(t('subject is required')),
        description: yup.string().required(t('description is required')),
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
  const submitForm = ({ subject, description }) => {
    const postBody = {
      subject,
      description,
    };
    if (!objectID) {
      OthersCreate(postBody);
    } else {
      OthersUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/others');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update others' : 'save others'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="subject">
                        <Form.Label>{t('subject')}</Form.Label>
                        <Controller
                          control={control}
                          name="subject"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.subject}
                              placeholder={t('subject of the others')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="description">
                        <Form.Label>{t('description')}</Form.Label>
                        <Controller
                          control={control}
                          name="description"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.description}
                              placeholder={t('description of the others')}
                              type="text"
                              size="sm"
                              as={'textarea'}
                            />
                          )}
                        />
                        {errors.description && <Form.Text className="text-danger">{errors.description.message}</Form.Text>}
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

export default CreateUpdateOthers;
