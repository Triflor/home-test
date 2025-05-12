'use client'
import Image from "next/image"
import Search from "@/assets/search.svg"
import img from "@/assets/hero-bg.jpg"
import Down from "@/assets/chevron-down.svg"
import { useEffect, useState } from "react"
import api from "@/api"
import Cookies from "js-cookie"

export default function Hero() {
    const [dropdown, setDropdown] = useState(false)
    const [categories, setCategories] = useState('')
    const [selectedVal, setSelectedVal] = useState('Select Category')

    useEffect(() => {
        async function fething () {
            // const stored = Cookies.get('token')
            // const token = JSON.parse(stored)?.token

            try {
                const res = await api.get('/categories')
                setCategories(res.data.data)

            } catch(err) {
                console.error(err)
            }

            try {
                const resAr = await api.get(`/articles`, {
                    params : {
                        content :'kerbau',
                        limit : 3
                    }
                }) 
                console.log(resAr.data)
            } catch (error) {
                console.error(err)
            }
        }
        fething()
    },[])

    const handleSelected = (id, name) => {
        setSelectedVal(name)
        setDropdown(false)
    }

    return (
        <div>
            <div 
            className='h-[500px] relative w-[100%] primary-col-bg-trans flex flex-col justify-center 
            items-center text-white'>
                <Image
                    src={img}
                    width={'100%'}
                    height={'100%'}
                    alt="Hero"
                    className="object-cover w-[100%] z-[-30] h-[100%] absolute"
                />
                <div className='flex flex-col h-[276px] justify-between items-center text-white '>
                    <div className='flex flex-col md:mb-0 mb-4 max-w-[98%] md:w-[730px] text-center flex flex-col justify-center items-center'>
                        <p className='text-[16px] mb-2'>Blog Genzet</p>
                        <p className='text-[35px] md:text-[48px] leading-[39px] md:leading-[48px] mb-3'>
                            The Journal : Design Resources, Interviews, and Industry News</p>
                        <p className='text-[18px] md:text-[24px] font-[300]'>Your daily dose of design insights!</p>
                    </div>
                    <div className='w-[300px] primary-light-col-bg rounded-lg py-2 px-2 h-[fit-content] md:w-[608px] md:px-1  flex flex-col md:flex-row justify-between md:justify-around'>
                        <div 
                        className="flex flex-row cursor-pointer h-[fit-content] relative">
                            <div
                            onClick={() => setDropdown((prev) => !prev)}
                            className="w-[100%] md:w-[147px] flex items-center bg-[white] text-[14px] pl-3 md:pl-3 
                            mb-2 md:mb-0 rounded-l-md h-[34px] darkest-col md:h-[42px]" 
                            id="category">
                            {selectedVal}
                            </div>
                            <div 
                            onClick={() => setDropdown((prev) => !prev)}
                            className='bg-white w-[35px] pr-1 h-[34px] md:h-[42px] border-none rounded-r-md 
                            flex justify-center items-center'>
                                <Image
                                    alt="down"
                                    src={Down}
                                    height={'20px'}
                                    width={'20px'}
                                    priority
                                />
                            </div>
                            { dropdown &&
                            <div 
                            className="absolute transition-all drop-shadow-md duration-300 mt-[3rem] 
                            bg-white w-[100%] min-h-[6rem] max-h-[15rem]  rounded-[5px]">
                                <ul className="darkest-col text-[14px] px-1 py-2">
                                    {categories?.map((item, index) => (
                                        <li 
                                        key={index}
                                        onClick={() => handleSelected(item.id, item.name)}
                                        className="cursor-pointer rounded-md hover:bg-slate-200 py-2 pl-3">{item.name}</li>
                                    ))}
                                </ul>
                            </div>
                            }
                        </div>
                        <div className='flex flex-row h-[fit-content] w-[100%] md:w-[400px]'>
                            <span className='bg-white w-[40px] pl-1 h-[34px] md:h-[42px] border-none rounded-l-md flex 
                            justify-center items-center'>
                                <Image
                                    src={Search}
                                    alt={'Search'}
                                    height={'16px'}
                                    width={'16px'}
                                    className='h-[20px] md:h-[60px]'
                                    priority
                                />
                            </span>
                            <input 
                            placeholder="Search Article"
                            type="text" 
                            className="w-[100%] bg-[white] light-col border-none text-[13px] md:text-[14px] rounded-r-md border 
                            border-slate h-[34px] md:h-[42px]" 
                            name="search" 
                            id="search" />
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}