import React, {useState} from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import {navigate} from '@reach/router';



const Create = ({checkForCaptain, addPirate}) => {

    const [name, setName] = useState("");
    const [image, setimage] = useState("");
    const [chests, setChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [pegleg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [errorMessages, setErrorMessages] = useState([]);

    const [numOfChests] = useState([0,1,2,3,4,5,6,7]);
    const [differentCrewPositions] = useState([
        "Captain", "First Mate", "Quarter Master", "Bootswain", "Powder Monkey"
    ]);


    const handler = (event) => {
        event.preventDefault();
        const newPirate = {name: name, imageUrl: image ,chests: chests, catchPhrase: catchPhrase, crewPosition: crewPosition, pegLeg: pegleg, eyePatch: eyePatch, hookHand: hookHand};

        axios.post("http://localhost:8008/pirate", newPirate)
            .then(res => {
                console.log(res);
                addPirate(res.data);
                navigate("/pirate");
            })
            .catch(err => {
                if ( err.response === undefined){
                    navigate("/pirate");
                } else {
                console.log(err.response);
                const { errors } = err.response.data;
                setErrorMessages(Object.keys(errors).map(error => errors[error].message));
                }
            })
    }

    return (
        <div>
            <Link to={"/pirate"}>Show all!</Link>

            {
                errorMessages.map((val, i) =>
                    <p key={i}>{val}</p>
                )
            }

            <form onSubmit={handler}>
                <p>Name: </p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <p>Image Url: </p>
                <input type="text" value={image} onChange={e => setimage(e.target.value)} />
                <p>Chests: </p>
                <select value={chests} onChange={e => setChests(e.target.value)}>
                    {
                        numOfChests.map((number, i) =>
                            <option key={i} value={number}>{number}</option>
                        )
                    }
                </select>
                <p>Crew Position: </p>
                <select value={crewPosition} onChange={e => setCrewPosition(e.target.value)}>
                    {
                       differentCrewPositions.map((position, i) =>
                            <option key={i} value={position}>{position}</option>
                        )
                    }
                </select>
                <p>Catch Phrase: </p>
                <input type="text" value={catchPhrase} onChange={e => setCatchPhrase(e.target.value)} />
            <p>Peg Leg</p>
            <input
            type="checkbox"
            checked={pegleg}
            onChange={() => setPegLeg(!pegleg)}
            />
            <p>Eye Patch</p>
            <input
            type="checkbox"
            defaultChecked={eyePatch}
            onChange={() => setEyePatch(!eyePatch)}
            />
            <p>Hook Hand</p>
            <input
            type="checkbox"
            defaultChecked={hookHand}
            onChange={() => setHookHand(!hookHand)}
            />

            <input type="submit" value="Create Pirate!"/>
            </form> 
        </div>
    )
}

export default Create;