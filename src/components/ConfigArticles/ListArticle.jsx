'use client'
import Image from "next/image"
import dynamic from "next/dynamic"
import { useState } from "react"
import Down from "@/assets/chevron-down.svg"
import Search from "@/assets/search.svg"
import Plus from "@/assets/plus.svg"
import img from "@/assets/hero-bg.jpg"
import Link from "next/link"

const DeleteAlert = dynamic(() => import('@/components/Popup/Delete/DeleteArticle'))
const PreviewArticle = dynamic(() => import('@/components/Popup/PreviewArticle'))

export default function ListArticle ({datas, datasCategories}){
    const [show, setShow] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [createShow, setCreateShow] = useState(false)
    const [showArticle, setShowArticle] = useState(false)
    const [colectId, setColectId] = useState()
    const [id, setId] = useState('')

    const handleDelete = (id) => {
        setShow(true)
        setId(id)
    }

    const handlePreview = (id) => {
        setColectId(id)
        setShowArticle(true)
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

    const Header = () => {
        return (
            <div className="flex flex-col justify-start items-center h-[160px]">
            <div className="border-b flex items-center border-slate pl-6 h-[72px] w-[100%] font-[500]">
                Total Article {datas.length}</div>
            <div className="flex flex-row items-center w-[100%] px-5 justify-between h-[88px]">
            <div className='w-[380px] rounded-lg  h-[fit-content] flex flex-row justify-start '>
                <div 
                className="flex mr-2 min-w-[110px] rounded-md flex-row cursor-pointer h-[fit-content] relative">
                    <div
                    onClick={() => setDropdown((prev) => !prev)}
                    className="w-[100px] flex items-center bg-[white] text-[14px] pl-3 
                    mb-2 md:mb-0 rounded-l-md h-[35px] darkest-col" 
                    id="category">
                    Category
                    </div>
                    <div 
                    onClick={() => setDropdown((prev) => !prev)}
                    className='bg-white w-[35px] pr-1 h-[35px] border-none rounded-r-md 
                    flex justify-center items-center'>
                        <Image
                            alt="down"
                            src={Down}
                            height={'20px'}
                            width={'20px'}
                            priority={true}
                        />
                    </div>
                    { dropdown &&
                    <div 
                    className="absolute drop-shadow-md transition-all duration-300 mt-[2.5rem] bg-white w-[100%] 
                    min-h-[6rem] rounded-[5px]">
                        <ul className="darkest-col text-[14px] py-2 px-1">
                            {datasCategories.map((item, index) => (
                                <li
                                 key={index}
                                 onClick={() => handleSelected(item.name)}
                                 className="cursor-pointer rounded-md hover:bg-slate-200 py-1 pl-3">{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    }
                </div>
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
                    className="w-[100%] bg-[#F9FAFB] light-col border-none text-[13px] md:text-[14px] rounded-r-md border 
                    border-slate h-[35px]" 
                    name="search" 
                    id="search" />
                </div>
                </div>
                <Link
                href={'/admin/articles/creating'}
                className="cursor-pointer primary-col-bg px-4 justify-center items-center flex flex-row text-[14px] rounded-md 
                h-[36px] text-white">
                    <Image
                        src={Plus}
                        width={20}
                        height={20}
                        alt="Add"
                        priority={true}
                        className="mr-1"
                    />
                    <span>Add Articles</span>
                </Link>
            </div>
        </div>
        )
    }

    return (
        <div className="flex items-center p-[24px]">
          
            {show && 
                <DeleteAlert 
                setShow={setShow} 
                cat={datas.length} 
                id={id}/>}
            {showArticle &&
                <PreviewArticle id={colectId} setShowArticle={setShowArticle}/>
            }
            <div className={`w-[100%]`}>
                <div className={`w-[100%] ${createShow ? 'opacity-0' : 'opacity-100'} rounded-md bg-[#F9FAFB] w-[100%]`}>
                    {Header()}
                    <div className={`w-[100%]`}>
                        <table 
                        className="min-w-full divide-y divide-gray-200"
                        border='1'
                        cellPadding='10'
                        cellSpacing='0'
                        >
                            <thead className="bg-gray-100 h-[20px] text-[14px] w-[100%]">
                                <tr className="h-[20px] w-[100%]">
                                    <th className="py-3 px-1">Thumbnails</th>
                                    <th className="py-3 px-1">Title</th>
                                    <th className="py-3 px-1">Category</th>
                                    <th className="py-3 px-1">Created At</th>
                                    <th className="py-3 px-1">Action</th>
                                </tr>
                            </thead>
                            <tbody className=" text-[14px]">
                                { datas?.map((item, index) => (
                                    <tr key={index} 
                                    className="border-b border-slate">
                                        <td className="px-6 max-w-[220px] py-3 flex justify-center items-center">
                                            <Image
                                                src={item.imageUrl ? item.imageUrl : img}
                                                alt="Thumbnail"
                                                width={80}
                                                height={80}
                                                className="rounded-md h-[70px] object-cover"
                                            />
                                        </td>
                                        <td className="max-w-[150px] text-start px-6  w-[fit-content] py-3 ">
                                            {item.title}
                                        </td>
                                        <td className="max-w-[95px] px-5 text-center w-[fit-content] py-3 " >
                                            {item.category.name}</td>
                                        <td className="max-w-[130px] text-center text-[14px] px-5 w-[fit-content] py-3 ">
                                            {handleDate(item.createdAt)}</td>
                                        <td className="max-w-[110px] px-6  text-center w-[fit-content] py-3 ">
                                            <div className="flex flex-row justify-around items-center">
                                                <span
                                                onClick={() => handlePreview(item.id)}
                                                className='cursor-pointer primary-col'
                                                ><u>Preview</u></span>
                                                <Link
                                                href={`/admin/articles/editing/${item.id}`}>
                                                    <span
                                                    className='primary-col'
                                                    ><u>Edit</u></span>
                                                </Link>
                                                <span 
                                                className='red-col cursor-pointer'
                                                onClick={() => handleDelete(item.id)}><u>Delete</u></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>        
    )
}