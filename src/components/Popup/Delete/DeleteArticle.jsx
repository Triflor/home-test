'use client'
import { fethingAction } from './action'

export default function DeleteArticle ({setShow, cat, id}) {
  
    let margin = ''

    if(cat <= 2) margin ='mt-[10%]'
    else if(cat <= 4) margin ='mt-[-8%]'
    else if(cat <= 6) margin ='mt-[-18%]'
    else if(cat <= 8) margin ='mt-[-29%]'
    else if(cat <= 10) margin ='mt-[-48%]'

    const deleteAction = () => {
        fethingAction(id, '/admin/articles', '/articles', 'delete')
        setShow(false)
    }

    return (
        <div className={`w-[130%] h-[160%] ${margin} -ml-[30%] fixed bg-alert flex justify-center items-center z-[40]`}>
            <div className="w-[400px] bg-[white] p-5 rounded-md h-[180px] flex flex-col z-[50]">
                <h1 className="font-[500] mb-2 text-[20px]">Delete Article</h1>
                <p className="mb-3 text-[14px] darker-col">
                    Deleting this article is permanent and cannot be undone. All related content will be removed.</p>
                <div className="flex text-[14px] flex-row w-[100%] justify-end">
                    <button
                     onClick={() => setShow(false)}
                     className="mr-2 cursor-pointer w-[77px] h-[40px] flex justify-center items-center 
                     rounded-md border border-slate">
                     Cancel</button>
                    <button 
                     onClick={deleteAction}
                     className="mr-2 cursor-pointer w-[77px] h-[40px] flex justify-center items-center 
                     bg-[#DC2626] text-white rounded-md">
                     Delete</button>
                </div>
            </div>
        </div>
    )
}