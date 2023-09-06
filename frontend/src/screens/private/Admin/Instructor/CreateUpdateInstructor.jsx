//External lib imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Internal lib imports
import Layout from '../../../../layout/Layout';
import {
  useInstructorCreateMutation,
  useInstructorListQuery,
  useInstructorUpdateMutation,
} from '../../../../redux/services/instructorService';

const CreateUpdateInstructor = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allInstructor } = useInstructorListQuery();
  const [InstructorCreate, { isLoading: createLoading, isSuccess: createSuccess }] = useInstructorCreateMutation();
  const [InstructorUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] = useInstructorUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allInstructor) {
      setDetails(allInstructor?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allInstructor]);

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
        name: yup.string().required(t('name is required')),
        email: yup.string().required(t('email number is required')).email(t('invalid email address')),
        ...(!objectID && {
          password: yup.string().required(t('password is required.')).min(8, t('password must be 8 digits long')),
        }),
        ...(!objectID && {
          confirmPassword: yup
            .string()
            .required(t('confirm password is required'))
            .oneOf([yup.ref('password'), null], t('password and confirm password must match')),
        }),
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
  const submitForm = ({ name, email, password }) => {
    const postBody = {
      name,
      email,
      password,
    };
    if (!objectID) {
      InstructorCreate(postBody);
    } else {
      InstructorUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/instructor');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update instructor' : 'save instructor'}`)}</h5>
              <hr className="bg-light" />
              <Col>
                <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                  <Row class>
                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>{t('name')}</Form.Label>
                        <Controller
                          control={control}
                          name="name"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.name}
                              placeholder={t('name')}
                              type="name"
                            />
                          )}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                      </Form.Group>
                    </Col>

                    <Col sm={4}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>{t('email')}</Form.Label>
                        <Controller
                          control={control}
                          name="email"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Form.Control
                              onChange={onChange}
                              value={value}
                              ref={ref}
                              isInvalid={errors.email}
                              placeholder={t('email')}
                              type="email"
                            />
                          )}
                        />
                        {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                      </Form.Group>
                    </Col>

                    {!objectID && (
                      <Col sm={4}>
                        <Form.Group className="mb-3" controlId="Password">
                          <Form.Label>{t('password')}</Form.Label>
                          <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.password}
                                placeholder={t('password')}
                                type="password"
                              />
                            )}
                          />
                          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                        </Form.Group>
                      </Col>
                    )}

                    {!objectID && (
                      <Col sm={4}>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                          <Form.Label>{t('confirm password')}</Form.Label>
                          <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.confirmPassword}
                                placeholder={t('confirm password')}
                                type="password"
                              />
                            )}
                          />
                          {errors.confirmPassword && (
                            <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    )}
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

export default CreateUpdateInstructor;
