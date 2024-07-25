import { useOutlet, useOutletContext, useParams } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GridRows from "../../components/GridRows/GridRows";
import "./EmployeeList.scss";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import {
  useDeleteEmployeeListByIdMutation,
  useGetEmployeeListQuery,
} from "../../api/employeeApi";
import ContentHeader from "../../components/Content Header/ContentHeader";

const EmployeeList = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [empId, setEmpId] = useState(0);
  const [empDelete] = useDeleteEmployeeListByIdMutation();
  const [empDetails, setEmpDetails] = useState([
    {
      name: "Harry",
      id: 1,
      empJD: "12.02.24",
      role: "Full Stack",
      Status: "Probation",
      empExp: 5,
      address: "Location 1",
      email: "susan.kurian@example.com",
    },
    {
      name: "Susan Kurian",
      id: 2,
      empJD: "12.02.24",
      role: "UI Engineer",
      Status: "Probation",
      empExp: 5,
      address: "Location 1",
      email: "susan.kurian@example.com",
    },
    {
      name: "Susan Kurian",
      id: 3,
      empJD: "12.02.24",
      role: "UI Engineer",
      Status: "Active",
      empExp: 5,
      address: "Location 1",
      email: "susan.kurian@example.com",
    },
    {
      name: "Susan Kurian",
      id: 4,
      empJD: "12.02.24",
      role: "UI Engineer",
      Status: "Inactive",
      empExp: 5,
      address: "Location 1",
      email: "susan.kurian@example.com",
    },
  ]);

  const { data, isSuccess } = useGetEmployeeListQuery();
  useEffect(() => {
    if (isSuccess) {
      const employees = data.map((emp) => ({
        ...emp,
        joiningDate: new Date(emp.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));

      setEmpDetails(employees);
    }
  }, [data, isSuccess]);

  // const empHeaders = EmpDetails.headers;

  const empHeaders = {
    name: "Employee Name",
    id: "Employee ID",
    joiningDate: "Joining Date",
    experience: "Experience",

    Action: "Action",
  };

  const onClick = (id) => {
    navigate(`edit/${id}`);
  };

  const onDelete = (id) => {
    setShowDelete(false);
    empDelete({ id });
  };

  const actions = (id) => {
    return (
      <>
        <span className="employeelist--row--options" key={id}>
          <div
            className="employeelist--row--options--edit"
            onClick={(e) => {
              e.stopPropagation();
              onClick(id);
            }}
            key={id + 1}
          >
            <MdEditSquare key={id} />
          </div>
          <div
            className="employeelist--row--options--delete"
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(!showDelete);
              setEmpId(id);
            }}
            key={id}
          >
            <MdDelete key={id}></MdDelete>
          </div>
        </span>
      </>
    );
  };

  return (
    <>
          <ContentHeader title={"Employee List"} children={<div className="header--buttons">
            <div className="button-container"><Button
                className="create--button"
                text="Create Employee"
                handleSubmit={() => {
                  navigate("/admin/create-employee");
                }}
              ></Button></div>
              
            </div>}/>
      <main className="employeelist">
        <div className="employeelist--content">
          
          <GridRows
            Headers={empHeaders}
            Details={empDetails}
            actions={actions}
          ></GridRows>
          {showDelete && (
            <>
              {/* TODO: MODAL IS NOT MADE */}
              <Modal
                buttonStyle={"white"}
                onClose={() => {
                  setShowDelete(false);
                }}
                onSubmit={() => {
                  onDelete(empId);
                }}
                value={{ Del: "Delete", Cancel: "Cancel" }}
                className={"employeeList"}
              >
                <h3>Are you sure you want to delete this entry ?</h3>
                <Button
                  className="modal--deletebutton"
                  handleSubmit={() => {
                    onDelete(empId);
                  }}
                  text="Delete"
                />
                <Button
                  className="modal--cancelbutton"
                  handleSubmit={() => {
                    setShowDelete(false);
                  }}
                  text="Cancel"
                />
              </Modal>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default EmployeeList;
