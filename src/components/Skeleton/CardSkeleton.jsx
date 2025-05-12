export default function CardSkeleton () {
    return (
        <div className='flex flex-col justify-center items-center md:grid md:grid-cols-3 md:gap-8'>
            <div className='w-[300px] sm:w-[440px] h-[432px] md:w-[auto] mb-[38px] animate-pulse'>
                <div className='w-[100%] bg-slate-200 h-[240px] rounded-[12px]'></div>
                <div className='w-[35%] bg-slate-200 h-[16px] mt-3 mb-3 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] rounded-[5px]'></div>
            </div>
            <div className='w-[300px] sm:w-[440px] h-[432px] md:w-[auto] mb-[38px] animate-pulse'>
                <div className='w-[100%] bg-slate-200 h-[240px] rounded-[12px]'></div>
                <div className='w-[35%] bg-slate-200 h-[16px] mt-3 mb-3 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] rounded-[5px]'></div>
            </div>
            <div className='w-[300px] sm:w-[440px] h-[432px] md:w-[auto] mb-[38px] animate-pulse'>
                <div className='w-[100%] bg-slate-200 h-[240px] rounded-[12px]'></div>
                <div className='w-[35%] bg-slate-200 h-[16px] mt-3 mb-3 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] mb-1 rounded-[5px]'></div>
                <div className='w-[100%] bg-slate-200 h-[16px] rounded-[5px]'></div>
            </div>
        </div>
    )
}