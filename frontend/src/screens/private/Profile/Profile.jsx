//External Lib Import
import { Tab, Tabs } from 'react-bootstrap';
import { Row, Col, Container, Button, Card, Spinner, Form } from 'react-bootstrap';

//Internal Lib Import
import EditProfile from './EditProfile';
import Layout from '../../../layout/Layout';
import TakePhoto from './TakePhoto';

const Profile = () => {
  return (
    <Layout>
      <Container>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="editProfile" className="mb-3">
              <Tab eventKey="editProfile" title="Edit Profile">
                <EditProfile />
              </Tab>
              {/* <Tab eventKey="takePhoto" title="Take Photo">
                <TakePhoto />
              </Tab> */}
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Profile;
