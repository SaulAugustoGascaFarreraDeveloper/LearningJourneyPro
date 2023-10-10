"use client"
import React from 'react'
import { Typewriter } from "react-simple-typewriter";


type Props = {}

const TypewriterComponent = ({className,...props}: React.HTMLAttributes<HTMLDivElement>) => {
  
    return(
        <Typewriter
                words={["H A V E  F U N","L E A R N"]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={2000}
                
              />

    )


}

export default TypewriterComponent