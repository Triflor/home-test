import Link from "next/link"
export default function Unauthorized() {
    return (
        <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
            <h1 className="md:text-[43px] text-[28px] lg:text-[55px]">Resticted Access.</h1>
            <p className="darker-col mb-1 text-[18px] md:text-[22px] lg:text-[28px]">You can not continue.</p>
            <div className='darker-col text-[16px] lg:text-[20px]'>
                Go back <Link href={'/home'}><span className="primary-col cursor-pointer"><u> Home</u></span></Link>
            </div>
        </div>
    )
}