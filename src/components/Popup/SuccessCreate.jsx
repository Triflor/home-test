'use client'
import ReactDOM from 'react-dom'

export default function SuccesAlert ({text, desc}) {
    return ReactDOM.createPortal(
        <div 
        className='w-[100%] h-[100%] fixed flex items-center justify-center z-[100]'>
            <div 
            className='px-[2px] bg-trans flex text-ceneter justify-center items-center h-[4rem] w-[20rem] 
            rounded-md flex-col'>
                <h1 className='text-[18px]'>{text}</h1>
                <p className="text-[13px]">{desc}</p>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}