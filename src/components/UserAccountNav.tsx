"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import {LogOut} from "lucide-react"
import UserAvatar from './UserAvatar'
import { Session } from 'inspector'


type Props = {
    user: User
}

const UserAccountNav = ({user}: Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar user={user} />
        </DropdownMenuTrigger>
        
            <DropdownMenuContent align='end'>
                <div className="flex items-center justify-start gap-2 p-2">

                    <div className='flex flex-col space-y-1 leading-none'>

                        
                    {user.name && (<p className='font-medium'>{user.name}</p>)}
                    {
                        user.email && (
                            <p className='w-[200px] truncate text-sm text-secondary-foreground'>
                                {user.email}
                            </p>
                        )
                    }

                    </div>

                </div>

            <DropdownMenuSeparator />


            <DropdownMenuItem className='text-red-600 cursor-pointer' onSelect={() => {
                signOut()
            }}>
                Sign Out
                <LogOut className='ml-2 w-4 h-4' />
            </DropdownMenuItem>

            </DropdownMenuContent>
        
    </DropdownMenu>
  )
}

export default UserAccountNav