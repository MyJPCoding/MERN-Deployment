import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const Display = ({id, deleteById}) => {

    const [pirate, setPirate] = useState({
        _id: "",
        name: "",
        imageUrl: "",
        chests: 0,
        catchPhrase: "",
        crewPosition: "",
        pegLeg: true,
        eyePatch: true,
        hookHand: true

    })

    useEffect(() => {
        axios.get(`http://localhost:8008/pirate/${id}`)
            .then(res => {
                setPirate(res.data);
            })
    }, [id]);

    const deleteHandler = id => {
        deleteById(id);
        navigate("/");
    }


    return (
        <div>
            <Link to={'/'}>Go back!</Link>
            <h4>Name: {pirate.name}</h4>
            <p>Image: {pirate.imageUrl}</p>
            <p>Chests: {pirate.chests}</p>
            <p>Catch Phrase: {pirate.catchPhrase}</p>
            <p>Crew Position: {pirate.crewPosition}</p>
            <p>Peg Leg: {pirate.pegLeg}</p>
            <p>Eye Patch: {pirate.eyePatch}</p>
            <p>Hook Hand: {pirate.hookHand}</p>
            <button onClick={e => deleteHandler(pirate._id)}>Walk the Plank</button>
            <hr />
            <Link to={`/edit/${pirate._id}`}>Edit Me</Link><br/>
            <button onClick={e => deleteHandler(pirate._id)}>Delete me!</button>
        </div>
    )
}

export default Display;