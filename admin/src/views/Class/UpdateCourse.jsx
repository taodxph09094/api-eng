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
import {
  clearErrors,
  getCourseDetails,
  updateCourse,
} from "../../actions/courseAction";
import { UPDATE_COURSE_RESET } from "../../constants/courseConstants";
import Loader from "../../layouts/Loader/Loader";
const UpdateCourse = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, course } = useSelector((state) => state.courseDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.course);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
  const courseId = match.params.id;
  useEffect(() => {
    if (course && course._id !== courseId) {
      dispatch(getCourseDetails(courseId));
    } else {
      setName(course.name);
      setDescription(course.description);
      setPrice(course.price);
      setCategory(course.category);
      setStock(course.Stock);
      setOldImages(course.images);
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
      alert.success("Sửa thông tin khóa học thành công");
      history.push("/admin/courses");
      dispatch({ type: UPDATE_COURSE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    courseId,
    course,
    updateError,
  ]);

  const updateCourseSubmitHandler = (e) => {
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
    dispatch(updateCourse(courseId, myForm));
  };

  const updateCourseImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
                  <Card.Title as="h4">Chỉnh sửa khóa học</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={updateCourseSubmitHandler}>
                    <Row>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Tên khóa học</label>
                          <Form.Control
                            placeholder={name}
                            defaultValue={name}
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
                            placeholder={price}
                            defaultValue={price}
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
                            value={category}
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
                            placeholder={Stock}
                            defaultValue={Stock}
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
                            placeholder={description}
                            defaultValue={description}
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
                      Chỉnh sửa khóa học
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
                      onChange={updateCourseImagesChange}
                      multiple
                    />
                  </div>
                </div>
                <Card.Body>
                  <div className="author">
                    <div id="createProductFormImage">
                      {oldImages &&
                        oldImages.map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt="Old Product Preview"
                          />
                        ))}
                    </div>
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

export default UpdateCourse;
