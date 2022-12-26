import LeaderboardProps from "../Lb-Props";
import Button from "react-bootstrap/Button"
import Collapse  from "react-bootstrap/Collapse";
import { useState } from "react";

function Lb_User({nickname, score, date, time, kills} : LeaderboardProps){

    const [open, setOpen] = useState(false);

    return(
        <>
        <Button onClick={() => setOpen(!open)} 
        variant="dark" 
        size="lg" 
        className="d-flex flex-row justify-content-between"> 
            <div>{nickname}</div>
            <div>{score}</div> 
        </Button>
        <Collapse in={open}>
            <ul className="border border-1 border-dark rounded fs-5">
                <li className="list-group-item">Date of record: {date} </li>
                <li className="list-group-item">Time spent: {time} </li>
                <li className="list-group-item">Enemies killed: {kills} </li>
            </ul>
        </Collapse>
        </>
    )
}

export default Lb_User;
