'use client'
import Image from 'next/image'
import ReactDOM from 'react-dom'

export default function PreviewArticle ({datas}) {
    return ReactDOM.createPortal(
        <div 
        onClick ={(e) => e.stopPropagation()}
        className='bg-alert w-[100%] h-[100%] pt-[3%] fixed bg-alert flex justify-center z-[100]'>
        <div className='px-[2px] bg-white h-[38rem] rounded-sm'>
            <div 
            className="flex flex-col justify-center bg-[white] rounded-sm w-[50rem] h-[38rem] pt-[10rem] overflow-y-auto items-center px-[5rem]  ">
                <div className="w-[100%] flex flex-col items-center mb-4 text-center">
                    <p className="light-col md:text-[15px] font-[600] mb-3 mt-2">20, March 2022 . Saiful bahar</p>
                    <p className="md:text-[30px] font-[600] text-[24px] leading-[32px] md:w-[642px] md:leading-[36px] mb-[35px]">{datas?.title}</p>
                    <div className="w-[100%] md:h-[480px] mb-[34px]">
                        <Image
                            src={datas?.thumbnail && URL.createObjectURL(datas?.thumbnail[0])}
                            alt="Image"
                            height={100}
                            width={100}
                            className="rounded-[12px] w-[100%] h-[100%] object-cover"
                        />
                    </div>
                    <div className="text-left darker-col md:text-[16px] text-[14px]">
                        <p className=" mb-6">{datas?.content}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>,
        document.getElementById('modal-root')
    )
}