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
  useSummerAssessmentCreateMutation,
  useSummerAssessmentListQuery,
  useSummerAssessmentUpdateMutation,
} from '../../../../redux/services/summerAssessmentService';

const CreateUpdateSummerAssessment = () => {
  let [objectID, SetObjectID] = useState(null);
  const [details, setDetails] = useState({
    name: '',
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: allSummerAssessment } = useSummerAssessmentListQuery();
  const [SummerAssessmentCreate, { isLoading: createLoading, isSuccess: createSuccess }] =
    useSummerAssessmentCreateMutation();
  const [SummerAssessmentUpdate, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useSummerAssessmentUpdateMutation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (id !== null) {
      SetObjectID(id);
    }

    if (objectID && allSummerAssessment) {
      setDetails(allSummerAssessment?.data?.find((item) => item.id === objectID));
    }
  }, [objectID, allSummerAssessment]);

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
        name: yup.string().required(t('courses name is required')),
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
  const submitForm = ({ name }) => {
    const postBody = {
      name,
    };
    if (!objectID) {
      SummerAssessmentCreate(postBody);
    } else {
      SummerAssessmentUpdate({ id: objectID, postBody });
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate('/summer-assessment');
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <h5>{t(`${objectID ? 'update summer assessment' : 'save summer assessment'}`)}</h5>
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
                              defaultValue={value}
                              ref={ref}
                              isInvalid={errors.name}
                              placeholder={t('name of the summer assessment')}
                              type="text"
                              size="sm"
                            />
                          )}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
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

export default CreateUpdateSummerAssessment;
