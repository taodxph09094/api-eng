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
  deleteCenter,
  getCenter,
} from "../../actions/centerAction";
import { DELETE_CENTER_RESET } from "../../constants/centerConstants";
import Loader from "../../layouts/Loader/Loader";
const CenterList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, center } = useSelector((state) => state.allCenter);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.center);

  const deleteCenterHandler = (id) => {
    dispatch(deleteCenter(id));
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
      alert.success("Xóa trung tâm thành công !");
      history.push("/admin/centers");
      dispatch({ type: DELETE_CENTER_RESET });
    }

    dispatch(getCenter());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);
  const columns = [
    { field: "id", headerName: "ID", minWidth: 180, flex: 0.8 },

    {
      field: "name",
      headerName: "Tên trung tâm",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      minWidth: 150,
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
            {/* <Link
              className
              to={`/admin/centers/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link> */}

            <Button
              onClick={() =>
                deleteCenterHandler(params.getValue(params.id, "id"))
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

  center &&
    center.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        address: item.city,
      });
    });

  return (
    <>
      <h1 id="productListHeading">Danh sách trung tâm</h1>

      <h3>
        <Link className="addCenterButton" to="/admin/createCenter">
          <AiFillPlusCircle className="iconAdd" />
          Tạo trung tâm mới
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

export default CenterList;
