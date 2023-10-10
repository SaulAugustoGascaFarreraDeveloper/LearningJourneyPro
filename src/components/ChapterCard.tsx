"use client"
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'

type Props = {
    chapter: Chapter
    chapterIndex: number,
    completedChapters: Set<String>,
    setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>
}

export type ChapterCardHandler = {
    triggerLoad: () => void
}

const ChapterCard = React.forwardRef<ChapterCardHandler,Props>(({chapter,chapterIndex,setCompletedChapters,completedChapters},ref) => {


    const {toast} = useToast()

    const [success,setSuccess] = useState<boolean | null>(null)

    const {mutate: getChapterInfo,isLoading} = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/chapter/getInfo',{
                chapterId: chapter.id
            })

            return response.data
        }
    })



    const addChapterIdToSet = useCallback(()=>{

        setCompletedChapters((prev) => {

            const newSet = new Set(prev)

            newSet.add(chapter.id)

            return newSet
        })

    },[chapter.id,setCompletedChapters])


    useEffect(()=>{

        if(chapter.videoId)
        {
            setSuccess(true)
            addChapterIdToSet()
        }

    },[chapter,addChapterIdToSet])

    React.useImperativeHandle(ref,() => ({
        async triggerLoad() {
            //console.log('helloooo')

            if(chapter.videoId)
            {
                addChapterIdToSet()

                return
            }

            getChapterInfo(undefined,{
                onSuccess: ({success}) => {
                    //console.log('success')
                    setSuccess(true)

                    addChapterIdToSet()
                },
                onError: (error) => {
                    console.log(error)
                    setSuccess(false)

                    toast({
                        title:'Error',
                        description:'There was an error loading your chapter,We recommend  you to click on Back Button and try again!',
                        variant: 'destructive'
                    })

                    addChapterIdToSet()
                }
            })
        },
    }))

  return (
    <div key={chapter.id} className={cn("px-4 py-2 mt-2 rounded flex justify-between",{

        "bg-secondary": success === null,
        "bg-red-500": success === false,
        "bg-green-500": success === true
    
    })}>
        <h5>
            {chapter.name}
        </h5>
        {isLoading && <Loader2 className='animate-spin' />}
    </div>
  )
})

ChapterCard.displayName = "ChapterCard"

export default ChapterCard