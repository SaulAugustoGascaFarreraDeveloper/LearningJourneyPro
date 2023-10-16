"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { createChaptersSchema } from '@/validators/course'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import {motion,AnimatePresence} from "framer-motion"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import SubscriptionAction from './SubscriptionAction'

type Props = {
  isPro: boolean
}

type Input = z.infer<typeof createChaptersSchema>


const CreateCourseForm = ({isPro}: Props) => {

  const {toast} = useToast()

  const router = useRouter()

  const {mutate: createChapters,isLoading} = useMutation({
    mutationFn: async ({title,units} : Input) => {
      const response = await axios.post("/api/course/createChapters",{title,units})

      return response.data
    }
  })


  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const addUnitField = () => {

    form.setValue('units',[...form.watch('units'),''])

  }


  const removeUnitField = () => {

    form.setValue('units',form.watch('units').slice(0,-1))

  }

  const onSubmit = (data: Input) => {
    
    if (data.units.some((unit) => unit === "")) {
      

      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
        
      })

      return;
    }

      createChapters(data,{
        onSuccess:({course_id}) => {

          toast({
            title: 'Success',
            description: 'Course created succesfully',
            
            
          })

          router.push(`/create/${course_id}`)

        },
        onError:(error) => {
          console.log(error)

          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
            
          })
        }
      })

  }





  form.watch()

  return (
    <div className='w-full'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mt-4' >
                <FormField
                  control={form.control}
                  name='title'

                  render={({field}) => {

                    return(
                    <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                        <FormLabel className='flex-[1] text-xl'>
                            Title
                        </FormLabel>

                        <FormControl className='flex-[6]'>
                            <Input placeholder='Enter the main topic of the course' {...field} />
                        </FormControl>
                    </FormItem>
                  )}}

                />

                
                <AnimatePresence>

                    {form.watch('units').map((_,index) => {
                      return(

                        <motion.div key={index}
                          initial={{opacity: 0,height:0}}
                          animate={{opacity:1,height:'auto'}}
                          exit={{opacity: 0,height:0}}
                          transition={{
                            opacity: {duration: 0.2},
                            height: {duration: 0.2}
                          }}
                        >


                            <FormField

                            key={index}
                            control={form.control}
                            name={`units.${index}`}
                            render={({field}) => {
                              return(
                                <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row' >
                                    <FormLabel className='flex-[1] text-xl'>
                                        Unit {index+1}
                                    </FormLabel>

                                    <FormControl className='flex-[6]'>
                                        <Input placeholder='Enter the subtopic of the course' {...field} />
                                    </FormControl>
                                </FormItem>
                              )
                            }}

                            />

                        </motion.div>

                        
                      )
                    })}


                </AnimatePresence>


                <div className="flex items-center justify-center">
                  <Separator className='flex-[1] bg-slate-600 dark:bg-slate-400' />
                  <div className="mx-4 mt-4">
                    <Button disabled={isLoading} type='button' variant='secondary'
                     className='font-semibold '

                     onClick={addUnitField}

                     >
                        Add Unit
                        <Plus className='ml-2 w-4 h-4 text-green-500' />
                    </Button>

                    <Button disabled={isLoading} type='button' variant='secondary' 
                    className='font-semibold ml-2'
                    onClick={removeUnitField}>
                        Remove Unit
                        <Trash className='ml-2 w-4 h-4 text-red-500' />
                    </Button>
                  </div>
                  <Separator className='flex-[1] bg-slate-600 dark:bg-slate-400' />
                </div>

                <Button disabled={isLoading} type='submit' className='w-full mt-6' size='lg' >
                  Let's Go!
                </Button>

            </form>
        </Form>

        {!isPro &&  <SubscriptionAction />}
       

    </div>
  )
}

export default CreateCourseForm