"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'

type Props = {
    isPro: boolean
}

const SubscriptionButton = ({isPro}: Props) => {

    const [loading,setLoading] = useState<boolean>(false)

    const handleSubscribe = async () => {

        setLoading(true)

        try{

            const response = await axios.get("/api/stripe")
            //window.location.href = response.data.url

            console.log(response.data)

        }catch(error)
        {

            console.log("billing error")

        }finally{
            setLoading(false)
        }

    }

  return (
    <Button className='mt-4' disabled={loading} onClick={handleSubscribe}>
        {
            isPro ? "Manage Subscriotion" : "Update to PRO"
        }
    </Button>
  )
}

export default SubscriptionButton