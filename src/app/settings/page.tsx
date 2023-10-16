import SubscriptionButton from '@/components/SubscriptionButton'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { checkSubscription } from '@/lib/subscription'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const SettingsPage = async (props: Props) => {

    const session = await getAuthSession()

    if(!session?.user)
    {
        return redirect("/")
    }


    const isPro = await checkSubscription()



    const userSubscription = await prisma.userSubscription.findUnique({
        where:{
            userId: session.user.id
        }
    })

  return (
    <div className='py-8 max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold'>Settings</h1>
        {
            isPro ? (

                <div>
                    <p className='text-xl text-secondary-foreground/80'>
                            You are a Pro User!
                    </p>
                    <p className='text-xl text-secondary-foreground/80'>
                        You subscription ends on: {userSubscription?.stripeCurrentPeriodEnd?.toDateString()}
                    </p>
                </div>
                
            ) : (
                <p className='text-xl text-secondary-foreground/80'>
                  You are a Free User!
                </p>
            )
        }

        <SubscriptionButton isPro={isPro} />

    </div>
  )
}

export default SettingsPage