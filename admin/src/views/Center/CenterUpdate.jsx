import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
// react-bootstrap components
import {
  Badge,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";
// import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { UPDATE_USER_RESET } from "../../constants/userConstansts";
import Loader from "../../layouts/Loader/Loader";
import MetaData from "../../layouts/MetaData";
const UserUpdate = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [avatar, setAvatar] = useState();
  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setCreatedAt(user.createdAt);
      setAvatar(user.avatar);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Chỉnh sửa tài khoản thành công");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    myForm.set("createdAt", createdAt);
    myForm.set("avatar", avatar);
    dispatch(updateUser(userId, myForm));
  };
  return (
    <>
      <Container fluid>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Chỉnh sửa thông tin</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={updateUserSubmitHandler}>
                    <Row>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Họ tên</label>
                          <Form.Control
                            defaultValue={name}
                            placeholder={name}
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <Form.Control
                            placeholder={email}
                            defaultValue={email}
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label className="labelRole">Quyền dùng</label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="">Chọn quyền</option>
                            <option value="admin">Admin</option>
                            <option value="user">Quản lý</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Học viên</option>
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Địa chỉ</label>
                          <Form.Control
                            defaultValue="Hà Nội"
                            placeholder="Địa chỉ"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="4">
                        <Form.Group>
                          <label>Số điện thoại</label>
                          <Form.Control
                            defaultValue="012123324"
                            placeholder="Số điện thoại"
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Thông tin khác</label>
                          <Form.Control
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                        that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            as="textarea"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      disabled={
                        updateLoading
                          ? true
                          : false || role === ""
                          ? true
                          : false
                      }
                    >
                      Update Profile
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img
                    alt="..."
                    src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        className="avatar border-gray"
                        src={user.avatar.url}
                        alt={user.name}
                      />
                      <h5 className="title">{name}</h5>
                    </a>
                    <p className="description">{email}</p>
                  </div>
                  <p className="description text-center">{createdAt}</p>
                </Card.Body>
                <hr></hr>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default UserUpdate;
