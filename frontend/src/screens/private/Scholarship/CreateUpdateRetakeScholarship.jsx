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
  useScholarshipCreateMutation,
  useScholarshipListQuery,
  useScholarshipUpdateMutation,
} from '../../../redux/services/scholarshipService';

const CreateUpdateScholarship = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    subject: '',
    scholarshipType: '',
    description: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allScholarship } = useScholarshipListQuery();
  const [ScholarshipCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useScholarshipCreateMutation();
  const [ScholarshipUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useScholarshipUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allScholarship) {
      setDetails(allScholarship?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allScholarship]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: details,
    resolver: yupResolver(
      yup.object({
        subject: yup.string().required(t('subject is required')),
        scholarshipType: yup.string().required(t('scholarship type is required')),
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
  const submitForm = ({ subject, scholarshipType, description }) => {
    const postBody = {
      subject,
      scholarshipType,
      description,
    };
    if (!objectID) {
      ScholarshipCreate(postBody);
    } else {
      ScholarshipUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/scholarship');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update scholarship' : 'save scholarship'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={6}>
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
                              placeholder={t('subject of the scholarship')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.subject && <Form.Text className="text-danger">{errors.subject.message}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="scholarshipType">
                        <Form.Label>{t('scholarship type')}</Form.Label>
                        <Controller
                          control={control}
                          name="scholarshipType"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Select
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.status}
                              placeholder={t('scholarship type of the scholarship')}
                              type="text"
                              size="sm"
                            >
                              <option value="">{t('choice scholarship')}</option>
                              <option value="FACS">{t('FACS')}</option>
                              <option value="OTHERS">{t('OTHERS')}</option>
                            </Form.Select>
                          )}
                        />
                        {errors.scholarshipType && (
                          <Form.Text className="text-danger">{errors.scholarshipType.message}</Form.Text>
                        )}
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
                              placeholder={t('description registration of the scholarship')}
                              as="textarea"
                              size="sm"
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

export default CreateUpdateScholarship;
