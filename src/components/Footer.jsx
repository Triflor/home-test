import Image from "next/image"
import Logo from '@/assets/Logo.svg'

export default function Footer () {
    return (
        <div 
        className="flex primary-col-bg h-[100px] text-[white] primary-col-bg flex-col md:flex-row justify-center items-center">
            <Image
                alt={'Logo'}
                priority={true}
                width={'24px'}
                src={Logo}
                height={'24px'}
            />
            <span className='mt-2 text-[14px] md:text-[16px] md:mt-0 md:ml-2 '>2025 Blog genzet. All right reserved.</span>
        </div>
    )
}