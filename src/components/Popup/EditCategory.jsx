'use client'
import { fethingAction } from "./Delete/action"
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().nonempty('Please enter category.'),
})

export default function AddCategory ({setShowEdit, cat, datas, id}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver : zodResolver(schema)
    })
    let margin = ''

    if(cat <= 2) margin ='mt-[10%]'
    else if(cat <= 4) margin ='mt-[-8%]'
    else if(cat <= 6) margin ='mt-[-18%]'
    else if(cat <= 8) margin ='mt-[-29%]'
    else if(cat <= 10) margin ='mt-[-42%]'
    else if(cat > 10) margin ='mt-[-42%]'

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const res = await addAction(data)
        
        if(res.success) alert(res.message)
        if(!res.isLoading) setShowEdit(false)
    }

    const addAction = async (data) => {
        const res = await fethingAction(id, '/admin/Categories', '/categories', 'edit', data )
        return res
    }

    return (
        <div className={`w-[130%] h-[160%] ${margin} -ml-[30%] fixed bg-alert flex justify-center items-center z-[40]`}>
            <div className="w-[400px] bg-[white] p-5 rounded-md h-[230px] flex flex-col z-[50]">
                <h1 className="font-[500] mb-6 text-[20px]">Add Category</h1>
                <p className="mb-1 text-[14px] font-[500] darkest-col">
                    Category
                </p>
                <form
                 onSubmit={handleSubmit(onSubmit)}
                >
                <input
                 type="text" name="category" id="" 
                 placeholder="Input Category"
                 defaultValue={datas}
                 {...register('name')}
                 className="rounded-md w-[100%] h-[40px] border border-slate pl-3 text-[14px]"
                />
                 { errors.name && 
                    <span className='text-[12px] ml-1 danger-col'>{errors.name.message}
                    </span> }
                <div className="flex text-[14px] mt-[1.5rem] flex-row w-[100%] justify-end">
                    <button
                     onClick={() => setShowEdit(false)}
                     className="mr-2 cursor-pointer w-[70px] h-[36px] flex justify-center items-center rounded-md 
                     border border-slate">
                     Cancel</button>
                    <button 
                    type='submit'
                     className="cursor-pointer w-[50px] h-[36px] flex justify-center items-center primary-col-bg 
                     text-white rounded-md">
                     Add</button>
                </div>
                </form>
            </div>
        </div>
    )
}