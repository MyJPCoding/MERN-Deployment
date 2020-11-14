
import { navigate } from '@reach/router';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from '@reach/router';


const Edit = ({updatePirate, id}) => {

    const [name, setName] = useState("");
    const [imageUrl, setImage] = useState("");
    const [chests, setChest] = useState(4);
    const [catchphrase, setCatchPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [errorMessages, setErrorMessages] = useState([]);
//hello
    useEffect(() => {
        axios.get(`http://localhost:8008/pirate/`+id)
            .then(res => {
                console.log(res);
                setName(res.data.name);
                setImage(res.data.imageUrl);
                setChest(res.data.chests);
                setCatchPhrase(res.data.catchPhrase);
                setCrewPosition(res.data.crewPosition);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHookHand(res.data.hookHand);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const ifTrue = (target) => {
            if (target) {
                return "True";
            } else {
                return "False";
            }
        }

    const pegLegHandler = () => {

        const updatedPirate = {
            name: name,
            imageUrl: imageUrl,
            chests: chests,
            catchPhrase: catchphrase,
            crewPosition: crewPosition,
            pegLeg: !pegLeg,
            eyePatch: eyePatch,
            hookHand: hookHand
        };

        axios.put('http://localhost:8008/pirate/'+id+"/", updatedPirate)
            .then(res => {
                console.log(res);
                updatePirate(res.data);
                setPegLeg(!pegLeg);
                navigate("/pirate/"+id);
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

    
    const eyePatchHandler = () => {
        
        const updatedPirate = {
            name: name,
            imageUrl: imageUrl,
            chests: chests,
            catchPhrase: catchphrase,
            crewPosition: crewPosition,
            pegLeg: pegLeg,
            eyePatch: !eyePatch,
            hookHand: hookHand
        };
        
        axios.put('http://localhost:8008/pirate/'+id+"/", updatedPirate)
        .then(res => {
            console.log(res);
            updatePirate(res.data);
            setEyePatch(!eyePatch);
            navigate("/pirate/"+id);
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
    
    const hookHandHandler = () => {

        const updatedPirate = {
            name: name,
            imageUrl: imageUrl,
            chests: chests,
            catchPhrase: catchphrase,
            crewPosition: crewPosition,
            pegLeg: pegLeg,
            eyePatch: eyePatch,
            hookHand: !hookHand
        };

        axios.put('http://localhost:8008/pirate/'+id, updatedPirate)
            .then(res => {
                console.log(res);
                updatePirate(res.data);
                navigate("/pirate/"+id);
                setHookHand(!hookHand);
            })
            .catch(err => {
                if ( err.response === undefined){
                    navigate("/");
                } else {
                console.log(err.response);
                const { errors } = err.response.data;
                setErrorMessages(Object.keys(errors).map(error => errors[error].message));
                }
            })
    }
    return (
        <div>
            <h1>Hello World</h1>
            <Link to={"/pirate"}>Show all!</Link>
            
            {
                errorMessages.map((val, i) =>
                    <p key={i}>{val}</p>
                )
            }

            <h4>Name: {name}</h4>
            <p>Image: {imageUrl}</p>
            <p>Chests: {chests}</p>
            <p>Catch Phrase: {catchphrase}</p>
            <p>Crew Position: {crewPosition}</p>

            <p>Peg Leg: {ifTrue(pegLeg)}</p>
            <button onClick={e => pegLegHandler()}>Change</button>
            
            <p>Eye Patch: {ifTrue(eyePatch)}</p>
            <button onClick={e => eyePatchHandler()}>Change</button>

            <p>Hook Hand: {ifTrue(hookHand)}</p>
            <button onClick={e => hookHandHandler()}>Change</button>

        </div>
    )
}

export default Edit;