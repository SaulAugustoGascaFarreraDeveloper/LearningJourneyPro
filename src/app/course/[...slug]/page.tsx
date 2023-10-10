import CourseSideBar from '@/components/CourseSideBar'
import MainVideoSummary from '@/components/MainVideoSummary'
import QuizCards from '@/components/QuizCards'
import { prisma } from '@/lib/db'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        slug: string[]
    }
}

const CoursePage = async ({params:{slug}}: Props) => {

    const [courseId,unitIndexParam,chapterIndexParam] = slug
    

    const course = await prisma.course.findUnique({
        where:{
            id: courseId
        },
        include:{
            units:{
                include:{
                    chapters: {
                        include:{
                            questions: true
                        }
                    }
                }
            }
        }
    })

    if(!course)
    {
        return redirect("/gallery")
    }

    let unitIndex = parseInt(unitIndexParam)
    let chapterIndex = parseInt(chapterIndexParam)

    const unit = course.units[unitIndex]

    if(!unit)
    {
        return redirect("/gallery")
    }

    const chapter = unit.chapters[chapterIndex]

    if(!chapter)
    {
        return redirect("/gallery")
    }


    const nextChapter = unit.chapters[chapterIndex + 1]
    const prevChapter = unit.chapters[chapterIndex - 1]

  return (
    <div>
        <CourseSideBar course={course} currentChapterId={chapter.id} />

        <div>

            <div className='ml-[400px] px-8 '>
                <div className="flex">
                    <MainVideoSummary chapter={chapter} unit={unit} unitIndex={unitIndex} chapterIndex={chapterIndex} />
                    <QuizCards chapter={chapter} />
                </div>


                <div className='flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500'/>

                <div className="flex pb-8">
                    {
                        prevChapter && (
                            <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`} className='flex mt-4 mr-auto w-fit'>
                                <div className='flex items-center'>
                                
                                    <ChevronLeft className='mr-1 w-6 h-6' />
                                    <div className="flex flex-col items-start hover:animate-pulse">
                                        <span className='text-sm text-secondary-foreground/80'>
                                            Previous
                                        </span>
                                        <span className='text-xl font-bold'>
                                            {prevChapter.name}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    }

                    {
                        nextChapter && (
                            <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`} className='flex mt-4 ml-auto w-fit'>
                                <div className='flex items-center'>
                                
                                    <div className="flex flex-col items-end hover:animate-pulse">
                                        <span className='text-sm text-secondary-foreground/80'>
                                            Next
                                        </span>
                                        <span className='text-xl font-bold'>
                                            {nextChapter.name}
                                        </span>
                                    </div>
                                    <ChevronRight className='ml-1 w-6 h-6' />
                                </div>
                            </Link>
                        )
                    }
                </div>

            </div>

        </div>

    </div>
  )
}

export default CoursePage