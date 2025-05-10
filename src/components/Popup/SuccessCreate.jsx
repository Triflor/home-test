'use client'
import Image from 'next/image'
import ReactDOM from 'react-dom'

export default function SuccesAlert ({text}) {
    return ReactDOM.createPortal(
        <div 
        onClick ={(e) => e.stopPropagation()}
        className='w-[100%] h-[100%] fixed flex items-center justify-center z-[100]'>
        <div className='px-[2px] bg-trans flex text-ceneter justify-center items-center h-[4rem] w-[20rem] rounded-md'>
            <h1 className='text-[18px]'>{text}</h1>
        </div>
        </div>,
        document.getElementById('modal-root')
    )
}