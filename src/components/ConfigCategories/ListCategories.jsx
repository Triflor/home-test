'use client'

import Image from "next/image"
import dynamic from "next/dynamic"
import Search from "@/assets/search.svg"
import Plus from "@/assets/plus.svg"
import { useState } from "react"

const DeleteAlert = dynamic(() => import('@/components/Popup/Delete/DeleteCategory'))
const AddAlert = dynamic(() => import('@/components/Popup/AddCategory'))
const EditAlert = dynamic(() => import('@/components/Popup/EditCategory'))

export default function ListCategories ({datas}) {
    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [value, setValue] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setloading] = useState()
    const [showEdit, setShowEdit] = useState()
    const [id, setId] = useState()

    const handleDelete = (category, id) => {
        setCategory(category)
        setId(id)
        setShow(true)
    }

    const handleEdit = (category, id) => {
        setCategory(category)
        setId(id)
        setShowEdit(true)        
    }

    const handleDate = (inputDate) => {
        const date = new Date(inputDate)
        const formattedDate = date.toLocaleDateString('en-us', {
            year:'numeric',
            month:'short',
            day:'numeric'
        })
        return formattedDate
    }

    return (
        <div className="flex items-center p-[24px]">
            {show && 
            <DeleteAlert 
                setShow={setShow} 
                cat={datas.length} 
                id={id}
                category={category}
            />}
            {showAdd && 
            <AddAlert 
                setValue={setValue} 
                setShowAdd={setShowAdd} 
                cat={datas.length} 
            />}
            {showEdit && 
            <EditAlert 
                setValue={setValue} 
                setShowEdit={setShowEdit} 
                cat={datas.length} 
                id={id}
                datas={category}
            />}
            <div className="rounded-md bg-[#F9FAFB] w-[100%]">
                <div className="flex flex-col justify-start items-center h-[160px]">
                    <div className="border-b flex items-center border-slate pl-6 h-[72px] w-[100%] font-[500]">
                        Total Categories {datas.length}
                    </div>
                    <div className="flex flex-row items-center w-[100%] px-5 justify-between h-[88px]">
                    <div className='w-[380px] rounded-lg  h-[fit-content] flex flex-row justify-start '>
                        <div className='flex flex-row h-[fit-content] w-[250px] border border-slate rounded-md'>
                            <span className='bg-[#F9FAFB] w-[40px] pl-1 h-[35px] rounded-md flex 
                            justify-center items-center'>
                                <Image
                                    src={Search}
                                    alt={'Search'}
                                    height={'16px'}
                                    width={'16px'}
                                    className='h-[40px]'
                                    priority={true}
                                />
                            </span>
                            <input 
                            placeholder="Search Article"
                            type="text" 
                            className="w-[100%] bg-[#F9FAFB] light-col border-none text-[13px] md:text-[14px] 
                            rounded-r-md border 
                            border-slate h-[35px]" 
                            name="search" 
                            id="search" />
                        </div>
                        </div>
                        <button 
                        className="cursor-pointer primary-col-bg px-4 justify-center items-center flex flex-row text-[14px] 
                        rounded-md h-[36px] text-white">
                            <Image
                                src={Plus}
                                width={20}
                                height={20}
                                alt="Add"
                                priority={true}
                                className="mr-1"
                            />
                            <span onClick={() => setShowAdd(true)}>Add Category</span>
                        </button>
                    </div>
                </div>

                <div className="w-[100%]">
                    <table 
                    className="min-w-full divide-y divide-gray-200"
                    border='1'
                    cellPadding='10'
                    cellSpacing='0'
                    >
                        <thead className="bg-gray-100 h-[20px] text-[14px] w-[100%]">
                            <tr className="h-[20px] w-[100%]">
                                <th className="py-3 px-1">Category</th>
                                <th className="py-3 px-1">Created At</th>
                                <th className="py-3 px-1">Action</th>
                            </tr>
                        </thead>
                        <tbody className=" text-[14px]">
                            {datas.map((item, index) => (
                                <tr key={index} className="border-b border-slate darker-col">
                                    <td className="max-w-[200px] px-5 text-center w-[fit-content] py-4">
                                        {item.name}
                                    </td>
                                    <td className="max-w-[140px] text-center text-[14px] px-5 py-4 ">
                                        {handleDate(item.createdAt)}
                                    </td>
                                    <td className="max-w-[115px] px-[3rem] text-center py-4 ">
                                        <div 
                                        className="flex flex-row justify-center py-4 px-[2rem] items-center">
                                            <span
                                            onClick={() => handleEdit(item.name, item.id)}
                                            >
                                            <u className="cursor-pointer primary-col mr-3">Edit</u></span>
                                            <span
                                            onClick={() => handleDelete(item.name, item.id)}
                                            ><u className="cursor-pointer danger-col">Delete</u></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}