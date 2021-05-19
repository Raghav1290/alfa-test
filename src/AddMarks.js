import React, { useState } from 'react'
import './AddMarks.css';


function AddMarks() {


    let [total, setTotal] = useState(0)
    let [percentage, setPercentage] = useState(0)
    let [nameError, setNameError] = useState("")
    let [rollError, setRollError] = useState("")
    let [mathError, setMathError] = useState("")
    let [phyError, setPhyError] = useState("")
    let [chemError, setChemError] = useState("")

    let math = 0;
    let chem = 0;
    let phy = 0;
    let rollNum = null;
    let name = null;
    let test = "test";


    const mathScore = (event) => {
        math = parseFloat((event.target.value))
        if (math < 1 && math > 100) {
        }
    }

    const phyScore = (event) => {
        phy = parseFloat((event.target.value))

    }

    const chemScore = (event) => {
        chem = parseFloat((event.target.value))

    }

    const rollNumber = (event) => {
        rollNum = (event.target.value)
    }
    const nameInput = (event) => {
        name = (event.target.value);
        if(name.length < 4) {
            console.log("Please enter atleast 4")
            test = "Please enter"
            console.log(test)
        }
    }

    const getTotal = () => {
        const totalValue = chem + phy + math
        localStorage.setItem("rollNum", rollNum)
        localStorage.setItem("name", name)
        localStorage.setItem("math", parseFloat(math) )
        localStorage.setItem("phy", parseFloat(phy) )
        localStorage.setItem("chem", parseFloat(chem) )
        localStorage.setItem("total", totalValue )
        const total_local = localStorage.getItem("total")
        console.log(total_local)
        setTotal(total_local)
        document.getElementById("total").disabled = true;
        console.log(total)
    }


    const getPercentage = () => {
        const percentageValue = (total/300)*100
        localStorage.setItem("percentage", percentageValue )
        const percentage_local = localStorage.getItem("percentage")
        setPercentage(percentage_local)
        document.getElementById("percentage").disabled = true;
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        let maths = parseFloat(localStorage.getItem("math"));
        let chems = parseFloat(localStorage.getItem("chem"));
        let phys = parseFloat(localStorage.getItem("phy"));

        console.log("submitted")
        if ((localStorage.getItem("name")).length < 4) {
            setNameError("Please enter atleast 4 characters")
        }

        else if((localStorage.getItem("rollNum")).length < 3) {
            setRollError("Please enter atleast 3 characters")
        }

        else if (maths > 100 || maths < 1 ) {
            setMathError("Please enter value between 1 and 100")
        }

        else if (chems > 100 || chems < 1 ) {
            setChemError("Please enter value between 1 and 100")
        }
        else if (phys > 100 || phys < 1 ) {
            setPhyError("Please enter value between 1 and 100")
        }
        else (

            fetch('/enter', {
                method: 'POST',
                body: JSON.stringify({
                    data: {
                        "maths": parseFloat(localStorage.getItem("math")),
                        "phy": parseFloat(localStorage.getItem("phy")),
                        "chem": parseFloat(localStorage.getItem("chem")),
                        "total": parseFloat(localStorage.getItem("total")),
                        "percentage": parseFloat(localStorage.getItem("percentage")),
                        "rollNum": localStorage.getItem("rollNum"),
                        "name": localStorage.getItem("name")
                    }
                })
            })
        )


    }



    return (
        <div className="add-marks">
            <div className="container">
                <h1 className="text-center">Enter Marks</h1>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-12"></div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Enter Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={nameInput} placeholder="Enter Name" />
                                <small id="emailHelp" className="form-text text-muted">{nameError}</small>
                            </div>
                            <div className="form-group">
                                <label>Enter Maths Score</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={mathScore} placeholder="Math's Score" />
                                <small id="emailHelp" className="form-text text-muted">{mathError}</small>
                            </div>
                            <div className="form-group">
                                <label>Enter Physics Score</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={phyScore} placeholder="Physics Score" />
                                <small id="emailHelp" className="form-text text-muted">{phyError}</small>
                            </div>
                            <div className="form-group">
                                <label>Percentage</label>
                                <input type="number" onClick={getPercentage} onChange={e => console.log(e.target.value)} className="form-control" id="percentage" value={percentage} aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Enter Roll Number</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={rollNumber} placeholder="Enter Roll Number" />
                                <small id="emailHelp" className="form-text text-muted">{rollError}</small>
                            </div>
                            <div className="form-group">
                                <label>Enter Chemstry Score</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={chemScore} placeholder="Chemestry Score" />
                                <small id="emailHelp" className="form-text text-muted">{chemError}</small>
                            </div>
                            <div className="form-group">
                                <label>Total Score</label>
                                <input onClick={getTotal} type="number" className="form-control" id="total" aria-describedby="emailHelp" onChange={e => console.log(e.target.value)} value={total} />
                            </div>
                            <div className="form-group">
                                <p><b>NOTE: </b> After adding all the scores, Please first click on the total input and then on percentage input field to get automatically calculated Percentage. And if you get any input validation error so please refresh once and then enter the values</p>
                            </div>
                            

                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-12"></div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default AddMarks
