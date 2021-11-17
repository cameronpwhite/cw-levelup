import React, { useState, useEffect } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"
import { joinEvent } from "./EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    const eventFetcher = () => {
        getEvents()
            .then(data => setEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create" onClick={
                    () => {
                        history.push({pathname: "/events/new"})
                    }}>Create New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time}
                        </div>
                        <button className="btn btn-2"
                                onClick={
                                    () => {
                                        joinEvent(event.id)
                                            .then(() => eventFetcher())
                                    }
                                }
                        >Join</button>
                    </section>
                })
            }
        </article >
    )
}
