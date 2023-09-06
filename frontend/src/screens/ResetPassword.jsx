//External lib imports
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

//Internal lib imports
import { useResetPasswordMutation } from '../redux/services/authService';
import PublicLayout from '../layout/PublicLayout';
import SessionHelper from '../helpers/SessionHelper';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const { t } = useTranslation();
  const { accessToken } = useSelector((state) => state.authReducer);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: SessionHelper.GetRecoverVerifyEmail(),
      otp: SessionHelper.GetRecoverVerifyOTP(),
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required(t('email number is required')).email(t('invalid email address')),
        password: yup.string().required(t('Password is required.')).min(8, t('Password must be 8 digits long')),
        confirmPassword: yup
          .string()
          .required(t('Confirm password is required'))
          .oneOf([yup.ref('password'), null], t('Password and confirm password must match')),
      })
    ),
  });

  /*
   * form handle submit
   */
  const submitForm = (values) => {
    resetPassword(values);
  };

  useEffect(() => {
    if (!isSuccess) {
      if (!SessionHelper.GetRecoverVerifyEmail() || !SessionHelper.GetRecoverVerifyOTP()) {
        navigate('/forgot-password');
      }
    }
  }, [SessionHelper.GetRecoverVerifyEmail(), SessionHelper.GetRecoverVerifyOTP()]);

  useEffect(() => {
    if (accessToken || isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, accessToken]);

  return (
    <PublicLayout>
      <div className="auth-wrapper pt-5 mt-5">
        <div className="auth-content">
          <div className="auth-wrapper">
            <div className="auth-content">
              <Row className="justify-content-center">
                <Col xl={8} className="center-screen">
                  <Card className="w-100">
                    <Card.Body>
                      <h5>Reset Password</h5>
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
                                disabled
                              />
                            )}
                          />
                          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Password">
                          <Form.Label>Password</Form.Label>
                          <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.password}
                                placeholder="Password"
                                type="password"
                              />
                            )}
                          />
                          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                              <Form.Control
                                onChange={onChange}
                                value={value}
                                ref={ref}
                                isInvalid={errors.confirmPassword}
                                placeholder="Confirm Password"
                                type="confirmPassword"
                              />
                            )}
                          />
                          {errors.confirmPassword && (
                            <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                          )}
                        </Form.Group>

                        <div className="d-grid">
                          <button className="btn btn-primary btn-block login-btn mt-2" type="submit">
                            {isLoading ? <Spinner size="sm" color="light" /> : t('reset password')}
                          </button>
                        </div>
                      </Form>
                      <div className="text-center w-100 mt-3">
                        <Link className="text-center" to="/login">
                          Sign In
                        </Link>
                        <br />
                        <Link className="text-center" to="/forgot-password">
                          Forget Password
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

export default ResetPassword;
