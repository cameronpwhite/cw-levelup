import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "./GameManager.js"


export const EventForm = () => {

    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        time: "",
        date: "",
        description: "",
        organizer: ""
    })
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {

        const newEventState = {...currentEvent}

        if (domEvent.target.name === "gameId") {
            newEventState.gameId = domEvent.target.value
        } 
        else if (domEvent.target.name === "time") {
            newEventState.time = domEvent.target.value
        }
        else if (domEvent.target.name === "date") {
            newEventState.date = domEvent.target.value
        }
        else if (domEvent.target.name === "description") {
            newEventState.description = domEvent.target.value
        }

        setEvent(newEventState)
    }

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                    <label htmlFor="time">Time: </label>
                    <input name="time" type="time" className="form-control" required 
                    value = {currentEvent.time}
                    onChange = {changeEventState}/>
                    <label htmlFor="date">Date: </label>
                    <input name="date" type="date" className="form-control" required 
                    value = {currentEvent.date}
                    onChange = {changeEventState}/>
                    <label htmlFor="description">Description: </label>
                    <input name="description" className="form-control" required 
                    value = {currentEvent.description}
                    onChange = {changeEventState}/>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                    gameId: parseInt(currentEvent.gameId),
                    time: currentEvent.time,
                    date: currentEvent.date,
                    description: currentEvent.description,
                    organizer: ""
                    }


                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
        </>
    )
}
