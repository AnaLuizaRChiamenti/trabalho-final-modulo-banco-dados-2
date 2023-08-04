import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
  getTaskAsyncThunk,
  logout,
  taskArchivedAsyncThunk,
  taskDeleteAsyncThunk,
} from "../store/modules/UserLogged";
import { useDispatch } from "react-redux";
import ModalAdd from "../components/ModalAdd";
import NoteType from "../types/NoteType";
import DeleteDialog from "../components/ModalDeletar";
import ModalEditar from "../components/ModalEditar";
import { AppDispatch } from "../store/store";

const Recados: React.FC = () => {
  const userLogged = useAppSelector((state) => state.userLogged.userLogged);
  const listTaks = useAppSelector((state) => state.userLogged.userLogged.notes);
  const email = useAppSelector((state) => state.userLogged.userLogged.email);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editedTasks, setEditedTasks] = useState({} as NoteType);
  const [selectedNote, setSelectedNote] = useState({} as NoteType);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const archivedTasks = listTaks.filter((item) => item.archived);
  const [filterTask, setFilterTask] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userLogged.email) {
      navigate("/");
    }
  }, []);

  const handleClose = () => {
    setOpenAdd(false);
  };
  const addNotes = () => {
    setOpenAdd(false);
  };
  const openModalImput = () => {
    setOpenAdd(true);
  };

  const handleCloseUserMenu = () => {
    navigate("/");
    dispatch(logout());
  };

  const handleDelete = (item: NoteType) => {
    console.log("aaaa");

    setSelectedNote(item);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleDeleteConfirm = () => {
    const deleteTask = {
      id: selectedNote?.id,
      email: userLogged?.email,
    };

    dispatch(taskDeleteAsyncThunk(deleteTask));
    setTimeout(() => {
      dispatch(getTaskAsyncThunk(deleteTask.email));
    }, 500);
    setDeleteConfirmOpen(false);
  };

  const handleEdit = (item: NoteType) => {
    setEditedTasks(item);
    setOpenModalEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenModalEdit(false);
  };

  const addNotesEdit = () => {
    setOpenModalEdit(false);
  };

  const taskArchived = (id: string) => {
    if (archivedTasks) {
      dispatch(taskArchivedAsyncThunk({ id: id, email: email }));
      setTimeout(() => {
        dispatch(getTaskAsyncThunk(email));
        console.log(listTaks);
      }, 200);
    }
  };
  const handleShowArchivedChange = () => {
    setShowArchived(!showArchived);
  };

  return (
    <React.Fragment>
      <main className="w-[100vw] h-[100vh] flex">
        <div className="w-[100%] h-[100%] bg-[url('../public/assets/images/fundo.png')] fixed flex -z-40" />
        <DeleteDialog
          deleteConfirmOpen={deleteConfirmOpen}
          handleDeleteCancel={handleDeleteCancel}
          selectedNote={selectedNote}
          handleDeleteConfirm={handleDeleteConfirm}
        />
        <section className="h-[100%] w-[25%] flex items-center justify-center max-[376px]:h-[15%] max-[415px]:w-[100%] // max-[415px]:h-[10%]">
          <ModalAdd openModal={openAdd} actionConfirm={addNotes} actionCancel={handleClose} />
          {openModalEdit && (
            <ModalEditar
              openModal={openModalEdit}
              actionConfirm={addNotesEdit}
              actionCancel={handleCloseEdit}
              task={editedTasks}
            />
          )}
          <div className="w-[20%] h-[90%] rounded-3xl fixed flex flex-col bg-[#fca6a1] shadow-md max-[376px]:flex-row  ">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center max-[376px]:flex-row max-[376px]:w-0 max-[376px]:text-transparent ">
              <img src="./assets/images/iconePessoa.png" alt="" className="h-30" />
              Email
            </div>

            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center max-[376px]:flex-row max-[376px]:w-[68%] max-[376px]:justify-between">
              <button onClick={handleShowArchivedChange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="55"
                  height="96"
                  viewBox="0,0,256,256"
                  className="max-[376px]:w-[45px] max-[376px]:ml-5"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="none"
                    stroke-linecap="none"
                    stroke-linejoin="none"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(5.33333,5.33333)">
                      <path
                        d="M37,17h-10l-4.9,-4.1c-0.7,-0.6 -1.7,-0.9 -2.6,-0.9h-7.5c-1.6,0 -3,1.4 -3,3.1v12v6.9v7c0,1.7 1.4,3.1 3.1,3.1h31.9c1.7,0 3.1,-1.4 3.1,-3.1v-20.9c0,-1.7 -1.4,-3.1 -3.1,-3.1h-1.1z"
                        fill="#A2C3E0"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                      ></path>
                      <path
                        d="M5.5,29.8v6.7c0,1.7 1.3,3 3,3h31c1.7,0 3,-1.3 3,-3v-20c0,-1.7 -1.3,-3 -3,-3h-1.1"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32.7,13.5h-9.2l-4.9,-4.1c-0.7,-0.6 -1.6,-0.9 -2.6,-0.9h-7.5c-1.7,0 -3,1.3 -3,3v11.7"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M6,16.5h12.1c0.9,0 1.8,-0.3 2.6,-0.9l2.3,-1.9"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
              <button onClick={openModalImput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="80"
                  height="96"
                  viewBox="0,0,256,256"
                  className=" max-[376px]:h-[55px]"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="none"
                    stroke-linecap="none"
                    stroke-linejoin="none"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(5.33333,5.33333)">
                      <circle
                        cx="28"
                        cy="28"
                        r="18.5"
                        fill="#ffe474"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                      ></circle>
                      <path
                        d="M35.4,38.8c-3.2,2.4 -7.1,3.9 -11.4,3.9c-10.3,0 -18.7,-8.4 -18.7,-18.7c0,-2.6 0.6,-5.2 1.5,-7.4"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M12.1,9.6c3.2,-2.6 7.4,-4.3 11.9,-4.3c10.3,0 18.7,8.4 18.7,18.7c0,2.3 -0.4,4.5 -1.2,6.6"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M24,14v20"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M34,24h-20"
                        fill="none"
                        stroke="#472b29"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
            <div className="w-[100%] h-[15%] flex items-start  max-[376px]:justify-end max-[376px]:mr-4 max-[376px]:mt-2 max-[376px]:w-[32%]">
              <button onClick={handleCloseUserMenu}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsklEQVR4nO2ZTWgTQRTHF3rz4kHx4EXB2syHTTTSogelTchMoi3SYI4Be6gHPWjZaS1CEfHiQbRQrV7syYvoSSXX0quHikepgSSb+AUiVm2pVF6ZTUm2ZYuHvAndsn94DOzCzP83b3Z29q1lhQoVKtSO1kBX137JyIxgxBGMrklOodVw+2GkIjh5co7SQ8bMCx7pl4x8wTC9LQynSynGEqZm3qh52czIt1Q0egAVQDDyuDkIKets5HJWB0bfup8UpWcFJyUPxCMLU3qNNtMc6bcMKE1psjkGKaF27n1gsWZ+q3I5q0NwsrqRgWXUzr1rdOs9cMaOQlUVwLH/QFVBKzF7ZxAGTxyDqXFZgqo6bhzANe+oX60a9w97FSrjvWYBquqNGfOqHo5aMAuAsGy8UXt7BV5OZd22cb14Y685AOQZv5Q86Y5x8VQUFudG6tfLYwcDByC9EEECWJwbcY17ISbzfTIwAFBV8HH+MuROxxrjZTj9mea8JzAA4AMhGfnREkS7AQAb4n8Aett78SALz+8PocbMzYwec9lzkPwuCYmjA3h3D+PBaDEE8FtCz+5egKe3B1Dj3vUUpDldMb6EAv8Qw042vzteZIwW/XaAwBwlBGOdgkVs3QbyMLedAnOcbhdAze+DBuk4fU1w+kG3JgHALzAAdJnDr9wRGADZpm10dqOsolvsDPgWtjDNr5VtOB/j7hgaAjcDntKipPSMCYD3heFGlvOJOHYGNhd3dR1TZwLD+L+K7ZrPJ+INgOmJNHIGIpHDunbfjvN+ticKXxeu4gJo6VkXnHw2aX6otxvevR72Zugv1G7tsbCUJGSf4PSh+48A6RdTppu5y2d6Ir155usxb5kUVEY7wbGXzLwD7BVwRmNGAVyIsjoCjnoFjvqNYtxx+ynAJ5sZNx8q1C7TOohYpDUlSeXRAAAAAElFTkSuQmCC"
                  className="w-9 h-9 ml-5 max-[376px]:h-[33px] max-[376px]:w-[30px]"
                ></img>
              </button>
            </div>
          </div>
        </section>
        <section className="w-[75%] h-[100%] flex flex-col justify-between items-center">
          <div className="w-[60%] h-[13%] mt-5 flex pt-10 gap-5">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="64"
                height="64"
                viewBox="0,0,256,256"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(2,2)">
                    <path
                      d="M108.9,108.9v0c-2.3,2.3 -6.1,2.3 -8.5,0l-12.7,-12.7c-2.3,-2.3 -2.3,-6.1 0,-8.5v0c2.3,-2.3 6.1,-2.3 8.5,0l12.7,12.7c2.3,2.4 2.3,6.2 0,8.5z"
                      fill="#ffffff"
                    ></path>
                    <path
                      transform="translate(-21.6794,52.33858) rotate(-45.001)"
                      d="M52.3,17.3c-19.32997,0 -35,15.67003 -35,35c0,19.32997 15.67003,35 35,35c19.32997,0 35,-15.67003 35,-35c0,-19.32997 -15.67003,-35 -35,-35z"
                      fill="#ffffff"
                    ></path>
                    <path
                      transform="translate(-21.6794,52.33858) rotate(-45.001)"
                      d="M52.3,17.3c-19.32997,0 -35,15.67003 -35,35c0,19.32997 15.67003,35 35,35c19.32997,0 35,-15.67003 35,-35c0,-19.32997 -15.67003,-35 -35,-35z"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M52.3,84.3c-1.7,0 -3,-1.3 -3,-3c0,-1.7 1.3,-3 3,-3c6.9,0 13.5,-2.7 18.4,-7.6c6.4,-6.4 9,-15.5 6.9,-24.4c-0.4,-1.6 0.6,-3.2 2.2,-3.6c1.6,-0.4 3.2,0.6 3.6,2.2c2.6,10.9 -0.5,22.2 -8.4,30.1c-6.1,6 -14.1,9.3 -22.7,9.3zM73,35c-0.8,0 -1.5,-0.3 -2.1,-0.9l-0.2,-0.1c-1.2,-1.2 -1.2,-3.1 0,-4.2c1.2,-1.2 3.1,-1.2 4.2,0l0.2,0.2c1.2,1.2 1.2,3.1 0,4.2c-0.6,0.5 -1.3,0.8 -2.1,0.8z"
                      fill="#A2C3E0"
                    ></path>
                    <path
                      d="M52.3,90.3c-9.7,0 -19.5,-3.7 -26.9,-11.1c-14.8,-14.8 -14.8,-38.9 0,-53.7c14.8,-14.8 38.9,-14.8 53.7,0v0c14.9,14.8 14.9,38.9 0.1,53.7c-7.4,7.4 -17.1,11.1 -26.9,11.1zM52.3,20.4c-8.2,0 -16.4,3.1 -22.6,9.4c-12.5,12.5 -12.5,32.8 0,45.3c12.5,12.3 32.8,12.3 45.3,-0.1c12.5,-12.5 12.5,-32.8 0,-45.3c-6.3,-6.2 -14.5,-9.3 -22.7,-9.3zM111,98.3l-12.7,-12.7c-1.7,-1.7 -4,-2.6 -6.4,-2.6c-1.4,0 -2.7,0.3 -3.9,0.9l-2.5,-2.5c-1.2,-1.2 -3.1,-1.2 -4.2,0c-1.2,1.2 -1.2,3.1 0,4.2l2.5,2.5c-0.6,1.2 -0.9,2.5 -0.9,3.9c0,2.4 0.9,4.7 2.6,6.4l12.8,12.6c1.8,1.8 4.1,2.6 6.4,2.6c2.3,0 4.6,-0.9 6.4,-2.6v0c3.4,-3.5 3.4,-9.2 -0.1,-12.7zM106.8,106.8c-1.2,1.2 -3.1,1.2 -4.2,0l-12.8,-12.7c-0.6,-0.6 -0.9,-1.3 -0.9,-2.1c0,-0.8 0.3,-1.6 0.9,-2.1c0.6,-0.6 1.3,-0.9 2.1,-0.9c0.8,0 1.6,0.3 2.1,0.9l12.7,12.7c1.3,1.1 1.3,3 0.1,4.2z"
                      fill="#472b29"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-pink-400 focus:ring-2 focus:ring-inset focus:ring-pink-600  sm:leading-6 focus: outline-none p-2 bg-[#FCA5A1] indent-3 text-lg "
              value={filterTask}
              onChange={(e) => setFilterTask(e.target.value)}
            ></input>
          </div>
          <div className="w-[90%]  mb-12 flex flex-wrap rounded-2xl pl-10 ">
            <div className="w-[100%] h-[80%] mt-5 flex flex-wrap justify-center">
              {showArchived
                ? archivedTasks
                    .filter((task) => {
                      if (filterTask) {
                        return task.title.includes(filterTask);
                      }
                      return true;
                    })
                    .map((task) => (
                      <>
                        <div className="w-[65px] h-[167px] bg-stone-100 rounded-[33px] mt-3 flex flex-col justify-around items-center">
                          <button onClick={() => handleEdit(task)}>
                            <img
                              src="data:image/png;base64,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"
                              className="w-[35px]"
                            ></img>
                          </button>
                          <button onClick={() => handleDelete(task)}>
                            <img
                              src="data:image/png;base64,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"
                              className="w-[35px]"
                            ></img>
                          </button>
                          <button onClick={() => taskArchived(task.id)}>
                            {task.archived} (
                            <>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEGUlEQVR4nO2ZTWgTQRTHV0SvXgTx6qHdmUnTtKnaprRNmzjTJtFkRnvwCz8vXlSsH9gW1IsIFvzAm6BXLXoQBBVPCurF9iAoiqL14KF+f2vXj5E3dsNEu8km2SYN5MFj0p3d4f12/u/lZWoYVata1apWNa8tGAzOYQQNUmKOUmJOMIKkk1OCXlFi3qS4do1hGLOMclsvxnMpQXeyBe3s5o0un29BWQEYQYOFBW/viDnW7avxlw2AEnM0HRA2d4Gcst2fqKmZr+SG0U9NVh+XkdrlRjmMapoHObl+DuNuhtF7DeIXJWi3UWpjmhzsa7K3d7YlxKDF+ZglhHTyJ/G4tbbe/70YCbJMOU5QgkYoQQO5lJAVQAWfJXDdXyeTsm9x0BMApjtGt1xBTAnA+XO3AOBfOZcnW0MyRtBvj0H6C90BWahPcP7SEqLdKPz7aI+WVyOukxhGLwAUhBA/LCF2FALRi/FcPSdcAKDDjKBvMHoFUKwzTRWThWQACovrtzCjAET6+kBlA3A+VtkAQsiKAVhdX6eCh7EiAe7HeuSp1pAaKxLAcvApg436apsoNk/AON0Ab1MpeSXSJQ8sXSK3NARkqo4oh89w7Wo0It+lkvkBMIJeTCbMi+kC+MK5PBfukCvrSM72YZXfJ8+HO1R74hbA01bCq2ZvR7BRjq9YUV4ACGBdwJ8R2NbGgBzuDEMrLj+mUsofx+NyONyhpKTfuz7gl+PJZHkAQDbbmxrTa8d9WF7oDMvv4n9p2P5NCAUS02La2RRMy6mkAKB5Pfg7jLl+9jalGRCQEyUFgGqjJyy8+XzXGNZeACQ2VKeSAUCp1DWvy+ZerEcl9dn2NvjtoBw+wzWY0+Wk58S1aKR0AFDT7TUhYfW5vVpFGmpplkOhlvTfMKffC9Kx5w41Ly0dwKaG+vSaUG30uTPtbY6lE+b0ex8n4uk52I2SAcC3q73mh1QqY25CCHlce+u2Hw01Kznp98Kz9jysOWMAjrkEAN8Q+LubMLo+2CoWYLOWfMVIyBJCPk8kVC7A6ACARuwF4GQNIIoFOKgn8WQNnzKJQy0qkZ2S+F93klB/vn1KPg5y+lJAGbXcAqizGIxuTSfE6bbWonbUygaQhoCdwOhurn9wFOLQFkB7YLkM9GEsJvctaVK/yvTENtxarkNdNw4NGDRiOsRwuEN9wzo9AxXqejQik1oVG+3u/jvP+VP3AEIMeLHl0ApDS6zvxpaGgKoq0EJ/mGynnybi8lKkK6N7VVXR75Mv7Xaa89znpBnH65z3W0I88+QHjbYTzKVvbKiXzxKqBEMM+/M6mZuW/8Ph2j5GzDe5AqcYfWUEHYkGF80zZppFg4vmMYLWU4wuMmw+YMT8xLD5mRL0iGJ0mRK0jZnmwnLHWTUji/0B4JiQ20993GIAAAAASUVORK5CYII="
                                className="w-[35px]"
                              ></img>
                            </>
                            ) : (
                            <>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO2dX2gcRRzHN4JKBf88KFL0Sc7c/LlrkLO0BcFWmp1rEq1o4kONCG2tT22T24kiKHnwxT/QPolppQp9UFGkfemDaLFWitrmyReJLRIy01TQVGxqa6P2J3O9Gs3t3l3udnf2bn9f+MIyHHe3v8/M7zc7ezvnOCgUCoVCoVAoFAqFQqFQKBQKhfJXl8vJgMvpe4KT04KRi4JTaNYuo5dcRpTLyRHB6ZggZCUGPkAu5z0uIydbCXhdIJxcEZzu21i473YE8R8VKe1rtbcvE8R0L6VrEIIJfq57leBkPq7gi0Vfdll2S9ohdEWddkRtX3UZedV8DyeNMgXXYvBh0eTjgULhFidtujbb8QkIIxeLnG4rZjK3tfL+Q2vvXeHmScHlZMLl9O+aEBid7O+5/x4nTSpPNf2KZI5uDfuzenn2UZfTC3VGw9mNueyDTloUVHxb7flB2pTP5s0MqOYMiZHfi4wNOWlQUBCi/MyB7u47BSdf1ivOgtPXxh3nBqeTZQOAUTGTudll5KD94l+rJpnrIpOiybsiR/ojmak1AwCmR1aC8t4EJadAyz9AS2jW77+xeaGYZ/aD3ZDJtyaFWgUAynsEtPy1laDDEp/4aBg2F3LtAmG+l9JNVgCALnWD8i6EGXyo+MyxHTC8/oG2gRDaSFgWAOV9GEXwoeK573bCrifWJSDA9W1WD0KpCY0CgJnRFaDlpSgBgJZw5cdR2D/eD0+uWWU9yPVsFjDjA3C2RKIOPgT7HZjccaMTs8y1kOBke+AqMSMH4gMw6xUsAgBQ8iuYfekux4JcRp7zTUOcTqUHgDb2zsDsC9SJWQ/39NwRVIxTBkBCeRamPHNRFKsajVPnA9DldPQXqNLulk8+gjg18cZkzmdozSUagI7fQQBAy6OgvGcAxptbsxKM7q2u7nQvApCNArieGj+DX3YufwV5iLGbBKd7XEbOG5tj04YA5PIAXEuNh5yohCmI1gdQhjC2AQHoWGvAEnsTCEBbBXAMAWiLAJScRAAaAViftwOOAPtBa5sU9Fg2e6v5GYixOcZpqIwPQC8hOZeTc4tLrOScacPrABkPAJeT49Xr3OQ4ApDxABCMLFSvBZEFBCBjAtCOy9G6g4owApAIABLQw3EEaPtBxhSk7Qcaa4BOpou56gJs2qpei0VYRgLA73erpg0B6HhGwOG3BqsAmDYEoONLQ0cPboEXhx8q2xz7vg5TkLRbLxCARACptsKlCEAAtnuhxhFgPxAaUxB0kv+cLsG+V/rKj04Zm2PThjVAxwNg4uW+qgsx04YAdDwABtdWPzRo2hCAjgcA3hHTdmsAAtAIAG/Kc7wpD5iCLKcC6Lwa4L9l2dKdbdP8u6D5qRHf4D++Oh8KgB/86ZLtCECWg3pk/1O+ALaJ1a0DqLVtpdkj4fpISOMImJ8aKQc/aDOpPZ4bwgjIkf6g/IamNWNw6vCzrQOojIKvMdh0WR3ObCx1VclwAFjcvBva0ab4Tp943j91NfuQntmIDiHQhoLvm3paBWBkNqITnHxju4eJhHr34Lrgnh8GgIq6Kn/mcMDsCBXnnzqIhNnMfsxU08x2Th6q0ev/7y+cKBTXpn3Q7lby7UgAlCEo+YH1E9QJt/LWRwdgZjQDSv5m/SR1Yv1JZMH/F4Ia2wDaO5+Ak4VEWXmfws9jvs9Yhw/hp113g/JeByW/B+1dtn7y2prnQMnPYab0dNNblqFQKBQKhUKhUCgUyglV/wDetV+/LumSIgAAAABJRU5ErkJggg=="
                                className="w-[35px]"
                              ></img>
                            </>
                            )
                          </button>
                        </div>
                      </>
                    ))
                : listTaks
                    .filter((task) => {
                      if (filterTask) {
                        return task.title.includes(filterTask);
                      }
                      return true;
                    })
                    .map((task) => (
                      <>
                        <div
                          className="w-[300px] h-[190px] bg-[#A2C3E0] rounded-3xl flex pl-10 text-lg m-5 shadow-md"
                          key={task?.id}
                        >
                          <div className="w-[90%] h-[100%] flex justify-around flex-col ">
                            <h1>{task.title}</h1>
                            <p> {task.description} </p>
                          </div>
                          <div className="w-[65px] h-[167px] bg-stone-100 rounded-[33px] mt-3 flex flex-col justify-around items-center">
                            <button onClick={() => handleEdit(task)}>
                              <img
                                src="data:image/png;base64,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"
                                className="w-[35px]"
                              ></img>
                            </button>
                            <button onClick={() => handleDelete(task)}>
                              <img
                                src="data:image/png;base64,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"
                                className="w-[35px]"
                              ></img>
                            </button>
                            <button onClick={() => taskArchived(task.id)}>
                              {task.archived ? (
                                <>
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEGUlEQVR4nO2ZTWgTQRTHV0SvXgTx6qHdmUnTtKnaprRNmzjTJtFkRnvwCz8vXlSsH9gW1IsIFvzAm6BXLXoQBBVPCurF9iAoiqL14KF+f2vXj5E3dsNEu8km2SYN5MFj0p3d4f12/u/lZWoYVata1apWNa8tGAzOYQQNUmKOUmJOMIKkk1OCXlFi3qS4do1hGLOMclsvxnMpQXeyBe3s5o0un29BWQEYQYOFBW/viDnW7avxlw2AEnM0HRA2d4Gcst2fqKmZr+SG0U9NVh+XkdrlRjmMapoHObl+DuNuhtF7DeIXJWi3UWpjmhzsa7K3d7YlxKDF+ZglhHTyJ/G4tbbe/70YCbJMOU5QgkYoQQO5lJAVQAWfJXDdXyeTsm9x0BMApjtGt1xBTAnA+XO3AOBfOZcnW0MyRtBvj0H6C90BWahPcP7SEqLdKPz7aI+WVyOukxhGLwAUhBA/LCF2FALRi/FcPSdcAKDDjKBvMHoFUKwzTRWThWQACovrtzCjAET6+kBlA3A+VtkAQsiKAVhdX6eCh7EiAe7HeuSp1pAaKxLAcvApg436apsoNk/AON0Ab1MpeSXSJQ8sXSK3NARkqo4oh89w7Wo0It+lkvkBMIJeTCbMi+kC+MK5PBfukCvrSM72YZXfJ8+HO1R74hbA01bCq2ZvR7BRjq9YUV4ACGBdwJ8R2NbGgBzuDEMrLj+mUsofx+NyONyhpKTfuz7gl+PJZHkAQDbbmxrTa8d9WF7oDMvv4n9p2P5NCAUS02La2RRMy6mkAKB5Pfg7jLl+9jalGRCQEyUFgGqjJyy8+XzXGNZeACQ2VKeSAUCp1DWvy+ZerEcl9dn2NvjtoBw+wzWY0+Wk58S1aKR0AFDT7TUhYfW5vVpFGmpplkOhlvTfMKffC9Kx5w41Ly0dwKaG+vSaUG30uTPtbY6lE+b0ex8n4uk52I2SAcC3q73mh1QqY25CCHlce+u2Hw01Kznp98Kz9jysOWMAjrkEAN8Q+LubMLo+2CoWYLOWfMVIyBJCPk8kVC7A6ACARuwF4GQNIIoFOKgn8WQNnzKJQy0qkZ2S+F93klB/vn1KPg5y+lJAGbXcAqizGIxuTSfE6bbWonbUygaQhoCdwOhurn9wFOLQFkB7YLkM9GEsJvctaVK/yvTENtxarkNdNw4NGDRiOsRwuEN9wzo9AxXqejQik1oVG+3u/jvP+VP3AEIMeLHl0ApDS6zvxpaGgKoq0EJ/mGynnybi8lKkK6N7VVXR75Mv7Xaa89znpBnH65z3W0I88+QHjbYTzKVvbKiXzxKqBEMM+/M6mZuW/8Ph2j5GzDe5AqcYfWUEHYkGF80zZppFg4vmMYLWU4wuMmw+YMT8xLD5mRL0iGJ0mRK0jZnmwnLHWTUji/0B4JiQ20993GIAAAAASUVORK5CYII="></img>
                                </>
                              ) : (
                                <>
                                  <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO2dX2gcRRzHN4JKBf88KFL0Sc7c/LlrkLO0BcFWmp1rEq1o4kONCG2tT22T24kiKHnwxT/QPolppQp9UFGkfemDaLFWitrmyReJLRIy01TQVGxqa6P2J3O9Gs3t3l3udnf2bn9f+MIyHHe3v8/M7zc7ezvnOCgUCoVCoVAoFAqFQqFQKBQKhfJXl8vJgMvpe4KT04KRi4JTaNYuo5dcRpTLyRHB6ZggZCUGPkAu5z0uIydbCXhdIJxcEZzu21i473YE8R8VKe1rtbcvE8R0L6VrEIIJfq57leBkPq7gi0Vfdll2S9ohdEWddkRtX3UZedV8DyeNMgXXYvBh0eTjgULhFidtujbb8QkIIxeLnG4rZjK3tfL+Q2vvXeHmScHlZMLl9O+aEBid7O+5/x4nTSpPNf2KZI5uDfuzenn2UZfTC3VGw9mNueyDTloUVHxb7flB2pTP5s0MqOYMiZHfi4wNOWlQUBCi/MyB7u47BSdf1ivOgtPXxh3nBqeTZQOAUTGTudll5KD94l+rJpnrIpOiybsiR/ojmak1AwCmR1aC8t4EJadAyz9AS2jW77+xeaGYZ/aD3ZDJtyaFWgUAynsEtPy1laDDEp/4aBg2F3LtAmG+l9JNVgCALnWD8i6EGXyo+MyxHTC8/oG2gRDaSFgWAOV9GEXwoeK573bCrifWJSDA9W1WD0KpCY0CgJnRFaDlpSgBgJZw5cdR2D/eD0+uWWU9yPVsFjDjA3C2RKIOPgT7HZjccaMTs8y1kOBke+AqMSMH4gMw6xUsAgBQ8iuYfekux4JcRp7zTUOcTqUHgDb2zsDsC9SJWQ/39NwRVIxTBkBCeRamPHNRFKsajVPnA9DldPQXqNLulk8+gjg18cZkzmdozSUagI7fQQBAy6OgvGcAxptbsxKM7q2u7nQvApCNArieGj+DX3YufwV5iLGbBKd7XEbOG5tj04YA5PIAXEuNh5yohCmI1gdQhjC2AQHoWGvAEnsTCEBbBXAMAWiLAJScRAAaAViftwOOAPtBa5sU9Fg2e6v5GYixOcZpqIwPQC8hOZeTc4tLrOScacPrABkPAJeT49Xr3OQ4ApDxABCMLFSvBZEFBCBjAtCOy9G6g4owApAIABLQw3EEaPtBxhSk7Qcaa4BOpou56gJs2qpei0VYRgLA73erpg0B6HhGwOG3BqsAmDYEoONLQ0cPboEXhx8q2xz7vg5TkLRbLxCARACptsKlCEAAtnuhxhFgPxAaUxB0kv+cLsG+V/rKj04Zm2PThjVAxwNg4uW+qgsx04YAdDwABtdWPzRo2hCAjgcA3hHTdmsAAtAIAG/Kc7wpD5iCLKcC6Lwa4L9l2dKdbdP8u6D5qRHf4D++Oh8KgB/86ZLtCECWg3pk/1O+ALaJ1a0DqLVtpdkj4fpISOMImJ8aKQc/aDOpPZ4bwgjIkf6g/IamNWNw6vCzrQOojIKvMdh0WR3ObCx1VclwAFjcvBva0ab4Tp943j91NfuQntmIDiHQhoLvm3paBWBkNqITnHxju4eJhHr34Lrgnh8GgIq6Kn/mcMDsCBXnnzqIhNnMfsxU08x2Th6q0ev/7y+cKBTXpn3Q7lby7UgAlCEo+YH1E9QJt/LWRwdgZjQDSv5m/SR1Yv1JZMH/F4Ia2wDaO5+Ak4VEWXmfws9jvs9Yhw/hp113g/JeByW/B+1dtn7y2prnQMnPYab0dNNblqFQKBQKhUKhUCgUyglV/wDetV+/LumSIgAAAABJRU5ErkJggg=="
                                    className="w-[35px]"
                                  ></img>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Recados;
