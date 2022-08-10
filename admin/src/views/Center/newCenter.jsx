import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
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
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { clearErrors, createCenter } from "../../actions/centerAction";
import { CREATE_CENTER_RESET } from "../../constants/centerConstants";
import Loader from "../../layouts/Loader/Loader";

const NewCenter = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCenter);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm trung tâm thành công");
      history.push("/admin/centers");
      dispatch({ type: CREATE_CENTER_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCenterSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("city", city);

    dispatch(createCenter(myForm));
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
                  <Card.Title as="h4">Thêm trung tâm mới</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={createCenterSubmitHandler}>
                    <Row>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Tên trung tâm</label>
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
                          <label>Địa chỉ</label>
                          <Form.Control
                            placeholder={city}
                            defaultValue={city}
                            type="city"
                            required
                            onChange={(e) => setCity(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      disabled={loading ? true : false}
                    >
                      Thêm trung tâm mới
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default NewCenter;
