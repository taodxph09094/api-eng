import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "@material-ui/core";

import "./style.css";
import {
  clearErrors,
  deleteOrder,
  getAllClass,
} from "../../actions/classAction";
import { DELETE_CLASS_RESET } from "../../constants/classConstants";
const Class = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, ordersClass } = useSelector((state) => state.allClass);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.orderClass
  );

  const deleteCourseHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Xóa lớp thành công");
      history.push("/admin/class");
      dispatch({ type: DELETE_CLASS_RESET });
    }

    dispatch(getAllClass());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.2 },

    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Giá bán",
      type: "number",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Trạng thái",
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
            <Link to={`/admin/class/${params.getValue(params.id, "id")}`}>
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

  ordersClass &&
    ordersClass.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.courseItems.length,
        price: item.totalPrice,
        category: item.orderStatus,
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

export default Class;
