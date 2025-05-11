export default function ArticleSkeleton () {
    return (
        <div className='flex flex-col w-[50rem] items-center h-[38rem] w-[100%]'>
            <div className='w-[45%] bg-slate-200 h-[20px] mb-5 animate-pulse rounded-[5px]'></div>
            <div className='w-[100%] animate-pulse mb-[3rem]'>
                <div className='w-[100%] bg-slate-200 mb-5 h-[310px] rounded-[12px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] rounded-[5px]'></div>
            </div>
        </div>
    )
}