import { Link } from '@reach/router';
import React from 'react';
import {useState} from 'react';
import {navigate} from '@reach/router';


const List = ({pirate, deleteById}) => {
    const [pirateList, setPirateList] = useState([]);

    const deleteHandler = id => {
        deleteById(id);
        navigate("/pirate");
    }
    const viewPirate = id => {
        navigate("/pirate/"+id);
    }

    function dynamicSort(property) {
        var sortOrder = 1;
    
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
    
        return function (a,b) {
            if(sortOrder === -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }        
        }
    }

    const sorting = () =>{

        pirate = pirate.sort(dynamicSort("name"));
        return pirate;

    }

    

    // const ifTrue = (target) => {
    //     if (target) {
    //         return "True";
    //     } else {
    //         return "False";
    //     }
    // }
    return (
        <div>
            <Link to={"/pirate/new"}>Add new!</Link>
            {
                sorting().map((pirate, index) =>
                    <div key={index}>
                        <h5>{pirate.imageUrl}</h5>
                        <h4>Name: {pirate.name} <Link to={`/show/${pirate._id}`}></Link></h4>
                        {/* <p>Image: {pirate.imageUrl}</p>
                        <p>Chests: {pirate.chests}</p>
                        <p>Catch Phrase: {pirate.catchPhrase}</p>
                        <p>Crew Position: {pirate.crewPosition}</p>
                        <p>Peg Leg: {ifTrue(pirate.pegLeg)}</p>
                        <p>Eye Patch: {ifTrue(pirate.eyePatch)}</p>
                        <p>Hook Hand: {ifTrue(pirate.hookHand)}</p> */}
                        <button onClick={e => deleteHandler(pirate._id)}>Walk the Plank</button> <button onClick={e => viewPirate(pirate._id)}>View Pirate</button>
                        <hr />
                    </div>

                )
            }
        </div>
    )
}

export default List;