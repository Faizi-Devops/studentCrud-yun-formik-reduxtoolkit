import { Button } from "bootstrap";
import { Field, Formik, useFormik, } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../store/todoSlice";
import './style.css'
import Pagination from "../components/Pagination/Pagination";

const Todo = () => {
    const formik = useFormik({
        initialValues: {
            studentName: "",
            studentClass: "",
            studentBatch: "",
            studentYear: ""
        },
        validationSchema: Yup.object({
            studentName: Yup.string()
                .required('Student name is required')
                .matches(/^[a-zA-Z]+$/, 'Name can only contain alphabetical characters'),
            studentClass: Yup.string().required('Class is required')
                .matches(/^[a-zA-Z]+$/, 'Name can only contain alphabetical characters'),
            studentBatch: Yup.string().required('Batch is required')
                .matches(/^[a-zA-Z0-9]+$/, 'Only characters (letters and numbers) are allowed.'),
            studentYear: Yup.number().required('Year is required')
                .typeError('Contains a number'),
        }),
        onSubmit: (values) => {
            console.log(values, "values");
            dispatch(addTodo({ Name: values.studentName, Class: values.studentClass, Batch: values.studentBatch, Year: values.studentYear }));

        },

    })

    const count = useSelector((state) => state.todoing.value)
    console.log(count)
    const dispatch = useDispatch()
    const [naming, setNaming] = useState("");
    const [classing, setClassig] = useState("");
    const [batching, setBatching] = useState("")
    const [yearing, setYearing] = useState();
    const [update, setUpdate] = useState(false);
    const [indexing, setIndexing] = useState(0)
    const alpha = (e) => {
        setNaming(e.target.value);


    }
    const beta = (e) => {
        setClassig(e.target.value);

    }
    const gema = (e) => {
        setBatching(e.target.value);

    }
    const peta = (e) => {
        setYearing(e.target.value);

    }
    let newArray = {
        Name: naming,
        Class: classing,
        Batch: batching,
        Year: yearing
    }
    // const onAddHandler = () => {
    //     alert("sdgdsg")



    //         console.log("before dispatch")

    //         dispatch(addTodo(newArray))
    //         setNaming("")
    //         setBatching("")
    //         setYearing("")
    //         setClassig("")
    //         console.log("after dispatch");




    // }
    const onDeleteHandler = (indexing) => {

        dispatch(deleteTodo(indexing))

    }
    const onEditHandler = (valueing, indexing) => {
        setUpdate(true)
        setNaming(valueing.Name)
        setClassig(valueing.Class)
        setBatching(valueing.Batch)
        setYearing(valueing.Year)
        setIndexing(indexing)

    }
    const onUpdateHandler = () => {
        setUpdate(false)

        if (naming && classing && batching && yearing !== "") {
            dispatch(updateTodo({ Name: naming, Class: classing, Batch: batching, Year: yearing, indexing }))
            setBatching("")
            setClassig("")
            setYearing("")
            setNaming("")

        }
        else {
            alert("Please fill all the params");
        }
    }



    return (
        <div>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className="card back-shadow" style={{ width: "24rem" }}>

                    <div className="card-body">
                        <h5 className="card-title text-center">Student App</h5>
                        {/* <Formik></Formik> */}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3 mt-4">
                                <input type="text" className="form-control" name="studentName" value={formik.values.studentName} placeholder="Please enter Name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.studentName && formik.errors.studentName ? (
                                    <div className="text-danger">{formik.errors.studentName}</div>
                                ) : null}
                            </div>

                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="studentClass" value={formik.values.studentClass} placeholder="please enter Class" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.studentClass && formik.errors.studentClass && formik.touched.studentName ? (
                                    <div className="text-danger">{formik.errors.studentClass}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="studentBatch" value={formik.values.studentBatch} placeholder="please enter Batch" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.studentBatch && formik.errors.studentBatch ? (
                                    <div className="text-danger">{formik.errors.studentBatch}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="studentYear" value={formik.values.studentYear} placeholder="please enter Year" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.touched.studentYear && formik.errors.studentYear ? (
                                    <div className="text-danger">{formik.errors.studentYear}</div>
                                ) : null}
                            </div>
                            <div className="text-center">
                                {
                                    update ? <button type="button" className="btn btn-primary" onClick={onUpdateHandler}>Update Student</button> :


                                        <button type="submit" className="btn btn-primary"  >Add Student</button>}

                            </div>
                        </form>

                    </div>
                </div>

            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Year</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                {
                    count.map((value, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.Name}</td>
                                    <td>{value.Class}</td>
                                    <td>{value.Batch}</td>
                                    <td>{value.Year}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => onDeleteHandler(index)}>Delete</button>
                                    </td>
                                    <td><button type="button" className="btn btn-success" onClick={() => onEditHandler(value, index)}>Update</button>
                                    </td>

                                </tr>
                            </tbody>

                        )

                    })
                }

            </table>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex' }}>
      <Pagination />
    </div>
    <div style={{ display: 'flex' }}>
      <Pagination />
    </div>
  </div>


        </div>
    )
}
export default Todo;