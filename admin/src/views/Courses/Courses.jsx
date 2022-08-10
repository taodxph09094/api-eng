import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "@material-ui/core";
import {
  clearErrors,
  deleteCourse,
  getAdminCourse,
} from "../../actions/courseAction";
import { DELETE_COURSE_RESET } from "../../constants/courseConstants";
import "./style.css";
import MetaData from "../../layouts/MetaData";
const Courses = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, courses } = useSelector((state) => state.courses);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.course
  );

  const deleteCourseHandler = (id) => {
    dispatch(deleteCourse(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa khóa học thành công");
      history.push("/admin/courses");
      dispatch({ type: DELETE_COURSE_RESET });
    }

    dispatch(getAdminCourse());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.2 },

    {
      field: "name",
      headerName: "Tên khóa học",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "Giá bán",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Danh mục",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/course/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteCourseHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  courses &&
    courses.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.Stock,
        price: item.price,
        category: item.category,
      });
    });

  return (
    <>
      <h1 id="productListHeading">Danh sách khóa học</h1>

      <h3>
        <Link className="addCenterButton" to="/admin/createCourse">
          <AiFillPlusCircle className="iconAdd" />
          Thêm khóa học mới
        </Link>
      </h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="userList"
        autoHeight
      />
    </>
  );
};

export default Courses;
