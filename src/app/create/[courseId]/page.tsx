import ConfirmChapters from '@/components/ConfirmChapters'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        courseId: string
    }
}

const CreateChapters = async ({params:{courseId}}: Props) => {

    const session = await getAuthSession()


    if(!session?.user)
    {
        return redirect("/gallery")
    }

    const course = await prisma.course.findUnique({
        where:{
            id: courseId
        },
        include:{
            units: {
                include:{
                    chapters: true
                }
            }
        }
        
    })


    if(!course)
    {
        return redirect("/create")
    }

  return (
    <div className='flex flex-col items-start max-w-xl mx-auto my-16'>
        <h5 className='text-sm uppercase text-secondary-foreground/80'>
            Course Name
        </h5>
        <h1 className='text-3xl font-bold'>
            {course.name}
        </h1>

        <div className="flex p-4 mt-5 border-none bg-secondary">
            <InfoIcon className='w-12 h-12 mr-3 text-blue-400' />
            <div>
                We generated chapters for each of your units. Look Over them and then click the Button
                to confirm and continue.
            </div>
        </div>

        <ConfirmChapters course={course} />

    </div>
  )
}

export default CreateChapters