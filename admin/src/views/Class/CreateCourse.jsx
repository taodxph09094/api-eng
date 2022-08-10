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
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createCourse } from "../../actions/courseAction";
import { NEW_COURSE_RESET } from "../../constants/courseConstants";
import Loader from "../../layouts/Loader/Loader";
const CreateCourse = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newCourse);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Khóa Ielts cho người mất gốc",
    "Khóa Ielts cho trẻ em",
    "Khóa Ielts cho người lớn",
    "Khóa Ielts cấp tốc",
    "Luyện thi Ielts",
    "Tiếng anh giao tiếp",
    "Luyện thi Toeic",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm khóa học thành công");
      history.push("/admin/courses");
      dispatch({ type: NEW_COURSE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCourseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createCourse(myForm));
  };

  const createCourseImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
                  <Card.Title as="h4">Thêm khóa học</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={createCourseSubmitHandler}>
                    <Row>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Tên khóa học</label>
                          <Form.Control
                            placeholder="Tên khóa học"
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>Giá bán</label>
                          <Form.Control
                            placeholder="Giá bán"
                            type="number"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label className="labelRole">
                            Chọn danh mục sách
                          </label>
                          <select
                            className="selectCat"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Chọn danh mục</option>
                            {categories.map((cate) => (
                              <option key={cate} value={cate}>
                                {cate}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Số lượng</label>
                          <Form.Control
                            placeholder="Số lượng"
                            type="text"
                            required
                            onChange={(e) => setStock(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Mô tả</label>
                          <Form.Control
                            cols="80"
                            placeholder="Mô tả "
                            rows="4"
                            as="textarea"
                            onChange={(e) => setDescription(e.target.value)}
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
                      Thêm khóa học
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <div id="createProductFormFile">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createCourseImagesChange}
                      multiple
                    />
                  </div>
                </div>
                <Card.Body>
                  <div className="author">
                    <div id="createProductFormImage">
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Course Preview" />
                      ))}
                    </div>
                  </div>
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

export default CreateCourse;
