import React, {useState, useEffect} from 'react';
import { Router } from '@reach/router';
import List  from './List';
// import Display  from './Display';
import Create  from './Create';
import Edit from './Edit';
import axios from 'axios';


const Main = (props) => {

    const [pirate, setPirate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8008/pirate")
            .then(res => {
                console.log(res);
                setPirate(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const deleteById = (id) => {
        axios.delete(`http://localhost:8008/pirate/${id}`)
            .then(res => {
                console.log(res);
                removePirate(id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removePirate = (id) => {
        setPirate(pirate.filter(pirate => pirate._id !== id));
    }

    const addPirate = (pirate) => {
        setPirate([...pirate, pirate]);
    }

    const updatePirate = (newPirate) => {
        setPirate(pirate.map(pirate => pirate._id === newPirate._id ? newPirate : pirate));
    }

    // const checkForCaptain = (pirate) => {
    //     const hasCaptain = [];
    //    pirate.filter(position => position.includes('Captain')).map(filteredName => (
    //      hasCaptain = [...filteredName]
    //     ));
    //     const lengthofArray = hasCaptain.length;
    //     return lengthofArray;
    // }


    return (
        <div>
            <Router>
                <List path="/pirate" pirate={pirate} deleteById={deleteById}/>
                <Create path="/pirate/new" pirate={pirate} addPirate={addPirate}/>
                {/* <Display path="/show/:id" deleteById={deleteById}/> */}
                <Edit path="/pirate/:id" updatePirate={updatePirate}/>
            </Router>
        </div>
    )
}

export default Main;