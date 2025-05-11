'use client'

import dynamic from "next/dynamic"
import Image from "next/image"
import ArrowBack from "@/assets/arrow-back.png"
import Picture from "@/assets/image.svg"
import Down from "@/assets/chevron-down.svg"
import { useEffect, useState } from "react"
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import  Cookies  from 'js-cookie'
import api from '@/api'

const Preview = dynamic(() => import('../Popup/PreviewArticle'))
const SuccesAlert = dynamic(() => import('../Popup/SuccessCreate'))

const schema = z.object({
    title: z.string().min(1, 'Please enter title.'),
    category: z.string().min(1, 'Please select category.'),
    content: z.string().nonempty('Plese input content'),
    category: z.string().nonempty('Plese select catagory'),
    thumbnail: z.any().optional()
})

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false
})

export default function EditArticle ({datasCategories, datas, edit}) {

    const { control, reset,
        register, watch, setValue, getValues, handleSubmit, formState: { errors } } = useForm({
        resolver : zodResolver(schema)
    })
    const [dropdown, setDropdown] = useState(false)
    const [wordCount, setWordCount] = useState()
    const [imageAvail, setImageAvail] = useState()
    const [loading, setLoading] = useState(false)
    const [valuePreview, setValuePreview] = useState()
    const [showPreview, setShowPreview] =  useState(false)
    const [succesAlert, setSuccessAlert] = useState(false)
    const [getImage, setGetImage] = useState()
    const [categoryVal, setCategoryVal] = useState('Select Category')
    const router = useRouter()
    const imageWatch = watch('thumbnail')
    const content = watch('content')

    useEffect(() => {
        if(imageWatch && imageWatch.length > 0) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                return setImageAvail(true)
            },300)
        }
        return setImageAvail(false)
    },[imageWatch])


    useEffect(() => {
        if(datas && datas?.imageUrl) setGetImage(datas?.imageUrl)
        if(datas && datas?.content) setValue('content', datas?.content)
        if(datas) {
         setValue('category', datas?.categoryId)
         setCategoryVal(datas.category.name)
        }
        
    },[datas])

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const formData = new FormData()
            const stored = Cookies.get('token')
            const token = JSON.parse(stored)?.token

            formData.append('imageUrl', data.thumbnail[0])
            const resImage = await api.post('/upload', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            const finalData = {
                title : data.title,
                categoryId : data.category,
                content : data.content,
                imageUrl : getImage || resImage.data.imageUrl
            }

            
            const res = await api.put(`/articles/${id}`, finalData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setLoading(false)
            setImageAvail(false)
            setSuccessAlert(true)
            reset()
            getImage()

            setTimeout(() => {
                setSuccessAlert(false)
                router.back()
            },2500)

        } catch (err) {
            console.error('Err :', err.response?.data || err.message)
        }
    }  

    const handlePreview = () => {
        const value = getValues()
        setValuePreview(value)
        setShowPreview(true)
    }

    const countWords = (text) => {
        const word = text.replace(/<[^>]*>?/gm, "")
        const res = word.trim().split(/\s+/)
        return word.trim() === "" ? 0 : res.length
    }

    useEffect(() => {
        if(content) setWordCount(countWords(content))
    },[content])

    const module = {
        toolbar : [
            [{'size' : ['small', false, 'large', 'huge']}],
            ['bold', 'italic', 'underline'],
            ['link', 'image', 'video'],
            [{'list': 'ordered'}, {'list' : 'bullet'}],
        ]
    }

    const selectedVal = (name, id) => {
        setValue('category', id)
        setCategoryVal(name)
        setDropdown(false)
    }

    return (
        <div 
        className={`flex items-center p-[24px] h-[fit-content]`}>
            { showPreview && <Preview datas={valuePreview}/> }
            { succesAlert && <SuccesAlert text={'Successfully edit article!'}/>}

            <div className="rounded-md px-5 bg-[#F9FAFB] w-[100%] h-[fit-content]">
                <div className="flex flex-row w-[100%] h-[64px] items-center">
                    <button onClick={() => router.back()} className='cursor-pointer'>
                        <Image
                            src={ArrowBack}
                            alt='Back'
                            width={20}
                            heigth={20}
                        />
                    </button>
                    <p className="ml-2">Edit Article</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}  className='mt-[2rem]'>
                        <div className="flex flex-col mb-3">
                            <span>Thumbnails</span>
                            <label
                             htmlFor='thumbnail'
                             className="mt-1 cursor-pointer flex text-[13px] flex-col justify-center items-center light-col w-[223px] h-[187px] 
                             bg-[white] rounded-md border-dashed border-slate border-2">
                                {imageAvail && !loading && 
                                    <div className='flex flex-col items-center'>
                                        <Image
                                        src={URL.createObjectURL(imageWatch[0])}
                                        alt='Preview'
                                        width={100}
                                        height={100}
                                        className="mb-2 rounded-md w-[223px] object-cover h-[140px]"
                                        />
                                        <div className='flex flex-row items-center w-[100%] py-1 justify-center'>
                                            <span className='red-col'>Edit</span>
                                            <span className='red-col'>Delete</span>
                                        </div>
                                    </div> }
                                    {getImage && !loading && 
                                    <div className='flex flex-col items-center'>
                                        <Image
                                        src={getImage}
                                        alt='Preview'
                                        width={150}
                                        height={150}
                                        className="mb-2 rounded-md w-[210px] object-cover h-[140px]"
                                        />
                                        <div className='flex flex-row items-center w-[80%] py-1 justify-around'>
                                            <span className='primary-col'>Edit</span>
                                            <span className='red-col'>Delete</span>
                                        </div>
                                    </div> }
                                    { !loading && !imageAvail && !getImage &&
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image
                                            src={Picture}
                                            alt='Input'
                                            width={24}
                                            height={24}
                                            className="mb-2"
                                        />
                                        <u>Click to select file</u>
                                        <p>Suported file type : jpg or png</p>
                                    </div>
                                    }
                            </label>
                            <input type='file'
                            accept=".jpg, .png"
                            {...register('thumbnail')}
                            // defaultValue={datas?.imageUrl}
                            name="thumbnail" 
                            id="thumbnail" 
                            className="hidden"
                            />
                            { errors.thumbnail && 
                                <span className='text-[13px] mt-1 danger-col'>{errors.thumbnail.message}
                                </span> }                             
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="">Title</label>
                            <input type="text"
                            {...register('title')}
                            defaultValue={datas?.title}
                            placeholder="Input Title" 
                            className="bg-white mt-1 h-[37px] text-[14px] rounded-md w-[100%] pl-3" />
                            { errors.title && 
                                <span className='text-[13px] mt-1 danger-col'>{errors.title.message}
                                </span> }                            
                        </div>
                        <div className='mb-4'>
                        <label htmlFor="">Category</label>
                        <Controller
                            name='category'
                            defaultValue={datas?.category}
                            control={control}
                            render={({field}) =>(
                                <div 
                                className="flex rounded-md flex-row cursor-pointer h-[40px] relative">
                                    <div
                                    onInput={(e) => field.onChange(e.currentTarget.textContent)}
                                    onClick={() => setDropdown((prev) => !prev)}
                                    className="w-[100%] font-[500] flex items-center bg-[white] text-[14px] pl-3 md:pl-3 
                                    mb-2 md:mb-0 rounded-l-md darkest-col h-[38px]" 
                                    id="category">
                                    {categoryVal}
                                    </div>
                                        <div 
                                        onClick={() => setDropdown((prev) => !prev)}
                                        className='w-[35px] pr-1 h-[38px] bg-[white] rounded-r-md 
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
                                    className="absolute z-40 drop-shadow-md bg-white transition-all duration-300 mt-[2.7rem] w-[100%] 
                                    min-h-[5rem] rounded-[5px]">
                                        <ul className="darkest-col text-[14px] py-2 px-1 rounded-md">
                                            {datasCategories?.map((item, index) => (
                                                <li 
                                                key={index}
                                                onClick={() => selectedVal(item.name, item.id)}
                                                className="cursor-pointer rounded-md hover:bg-slate-200 py-1 pl-3">
                                                {item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    }
                                </div>
                            )}
                        />
                        { errors.category ?
                            <span className='text-[13px] mt-1 danger-col'>{errors.category.message}
                            </span> :
                        <span 
                        className="darker-col text-[14px] mt-1 pl-1">
                        The existing category list can be seen in the <u className="primary-col">Category</u> menu.</span>
                        }
                        </div>
                        <Controller
                            name='content'
                            defaultValue=''
                            control={control}
                            render={({field}) =>(
                            <div className=" h-[450px] mt-6 flex flex-col">
                            { errors.content && 
                                <span className='text-[13px] mt-1 danger-col'>{errors.content.message}
                                </span> 
                            }
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                className="rounded-md h-[450px] custom-quill-editor"
                                modules={module}
                                />
                            </div>
                            )}
                        />
                        <div className="mb-6 bg-[white] pl-4 text-[14px] font-[500] py-[10px] rounded-b-md w-[100%]">
                            {wordCount} Words
                        </div>
                        <div className="text-[14px] mt-[2.5rem]">
                            <ul className="float-right flex flex-row mb-[2.5rem]">
                                <li>
                                    <button
                                    onClick={() => reset()}
                                    className="mr-2 cursor-pointer border border-slate rounded-md w-[77px] h-[40px] bg-white 
                                    text-black flex justify-center items-center">
                                        Cancel
                                    </button>
                                </li>
                                <li>
                                    <button
                                    onClick={handlePreview}
                                    className="mr-2 cursor-pointer w-[77px] rounded-md h-[40px] soft-col-bg text-black flex 
                                    justify-center items-center">
                                        Preview
                                    </button>
                                </li>
                                <li>
                                    <button 
                                    disabled={loading}
                                    type='submit'
                                    className={`cursor-pointer w-[77px] h-[40px] rounded-md ${loading ? 'primary-col-bg-disable' : 'primary-col-bg'} text-white flex 
                                    justify-center items-center`}>
                                        {loading? '...' : 'Updated'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}