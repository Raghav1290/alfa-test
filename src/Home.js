import React, { useEffect } from 'react'
import './Home.css';
import Background from './images/backgorund1.png'

function Home() {

    useEffect(() => {
        console.log("Hey")
        fetch('/hello').then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(data => console.log(data))
    })

    return (
        <div className="home">
            <img className="home-back" src={Background} alt="" />
        </div>
    )
}

export default Home
