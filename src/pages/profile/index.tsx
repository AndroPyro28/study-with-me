import React from 'react';
import useAuth from '../../hooks/useAuth'
import { useSelector } from 'react-redux';
import { getUser } from '~/app/features/userSlice';
import { Profile, User } from '@prisma/client';
import DateTimeFormatter from '~/helper/DateTimeFormatter.helper';
import {format} from 'timeago.js'
import LoaderModal from '~/components/LoaderModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
const index = () => {
     const {isLoading, data, isError} = useAuth()

    if(isLoading) return <LoaderModal />
    if(isError) return <div>Something went wrong...</div>

     const { profile, email, createdAt, reviewer, event, quiz, username } = data!;

    return <div className="h-full bg-gray-200 p-8">
    <div className="bg-white rounded-lg shadow-xl pb-8">
        <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
            <button className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
            </button>
            <div x-show="openSettings" className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl">
                <div className="py-2 border-b">
                    <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                    <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                        <span className="text-sm text-gray-700">Share Profile</span>
                    </button>
                    <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                        </svg>
                        <span className="text-sm text-gray-700">Block User</span>
                    </button>
                    <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-sm text-gray-700">More Info</span>
                    </button>
                </div>
                <div className="py-2">
                    <p className="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                    <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span className="text-sm text-gray-700">Report</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="w-full h-[250px]">
            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
        </div>
        <div className="flex flex-col items-center -mt-20">
            <img src="/assets/defaultProfile.png" className="w-40 border-4 border-white rounded-full  object-cover" />
            <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl">{profile?.firstname} {profile?.lastname}</p>
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                </span>
            </div>
            <p className="text-gray-700">{username}</p>
            <p className="text-sm text-gray-500">@{email}</p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        </div>
    </div>

    <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                        <span className="font-bold w-24">Full name:</span>
                        <span className="text-gray-700">{profile?.firstname} {profile?.lastname} </span>
                    </li>
                    <li className="flex border-b py-2">
                        <span className="font-bold w-24">Joined:</span>
                        <span className="text-gray-700">{format(createdAt)}</span>
                    </li>
                    <li className="flex border-b py-2">
                        <span className="font-bold w-24">Email:</span>
                        <span className="text-gray-700">{email}</span>
                    </li>
                    <li className="flex border-b py-2">
                        <span className="font-bold w-24">Languages:</span>
                        <span className="text-gray-700">English, Filipino/Tagalog</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8 flex flex-col">
                <div className='flex justify-between'> <h4 className="text-xl text-gray-900 font-bold">Information</h4> <FontAwesomeIcon icon={faEdit} className=' cursor-pointer w-[20px] h-[20px]' /></div>
               

                <div className='flex justify-between w-[60%] m-5'>
                    <div className='flex flex-col'> <input type="text" value={profile?.firstname} />  </div>
                    
                    <div className='flex flex-col'><input type="text" value={profile?.lastname} />  </div>
                </div>

                <div className='flex justify-between w-[60%] m-5'>
                    <div className='flex flex-col'>  <input type="text" value={email} />  </div>
                    <div className='flex flex-col'>  <input type="text" value={username} />   </div>
                </div>

                <div className='flex justify-between w-[60%] m-5'>
                <div className='flex flex-col'> <input type="text" value={profile?.firstname} />  </div>
                <div className='flex flex-col'> <input type="text" value={profile?.lastname} />   </div>
                </div>
              
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">Activities</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-indigo-600">Total Note/Reviewer</span>
                            {/* <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span> */}
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex flex-col">
                                <div className="flex items-end">
                                    <span className="text-2xl 2xl:text-3xl font-bold">{reviewer?.length}</span>
                                    <div className="flex items-center ml-2 mb-1">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-green-600">Quiz</span>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            
                            <div className="flex flex-col">
                                <div className="flex items-end">
                                    <span className="text-2xl 2xl:text-3xl font-bold">{quiz?.length}</span>
                                    <div className="flex items-center ml-2 mb-1">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-blue-600">Events</span>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            
                            <div className="flex flex-col">
                                <div className="flex items-end">
                                    <span className="text-2xl 2xl:text-3xl font-bold">{event?.length}</span>
                                    <div className="flex items-center ml-2 mb-1">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                </div>
            </div>
        </div>
    </div>
</div>
}


export default index;