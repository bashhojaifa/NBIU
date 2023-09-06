//External lib imports
import { useEffect } from 'react';
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Internal lib imports
import { useForgotPasswordMutation } from '../redux/services/authService';
import PublicLayout from '../layout/PublicLayout';
import SessionHelper from '../helpers/SessionHelper';

const ForgetPassword = () => {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.authReducer);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required(t('email number is required')).email(t('invalid email address')),
      })
    ),
  });

  /*
   * form handle submit
   */
  const submitForm = (values) => {
    SessionHelper.RecoverVerifyEmail(values.email);
    forgotPassword(values);
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/verify-email');
    }
  }, [isSuccess]);

  return (
    <PublicLayout>
      <div className="auth-wrapper mt-5">
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-content">
              <Row className="justify-content-center">
                <Col xl={8} className="center-screen">
                  <Card className="w-100">
                    <Card.Body>
                      <h5>Forget Password</h5>
                      <br />
                      <Form onSubmit={handleSubmit(submitForm)} onReset={reset}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.email}
                                placeholder="Email"
                                type="email"
                              />
                            )}
                          />
                          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <div className="d-grid">
                          <button className="btn btn-primary btn-block login-btn mt-2" type="submit">
                            {isLoading ? <Spinner size="sm" color="light" /> : t('Send Otp')}
                          </button>
                        </div>
                      </Form>
                      <div className="text-center w-100 mt-3">
                        <Link className="text-center animated fadeInUp" to="/login">
                          Sign In
                        </Link>
                        <br />
                        <Link className="text-center animated fadeInUp" to="/register">
                          Sign Up
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForgetPassword;
