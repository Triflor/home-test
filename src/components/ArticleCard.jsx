import Link from "next/link"
import Image from "next/image"
import img from '@/assets/hero-bg.jpg'

export default function ArticleCard ({ datas = [] }) {
    return (
        <div className='flex flex-col justify-center mb-6 items-center md:grid md:grid-cols-2 
        lg:grid-cols-3 md:gap-4 lg:gap-8'>
            { datas.map((item, index) => (
                <Link
                key={index}
                href={`/details/${item?.categoryId}/${item?.id}`}
                className='w-[300px] md:w-[auto] mb-[38px]'>
                    <div className='w-[100%] h-[200px] md:h-[240px] rounded-[12px]'>
                        <Image
                            alt='article'
                            src={item?.imageUrl ? item.imageUrl : img}
                            height={300}
                            width={300}
                            className="rounded-[12px] w-[100%] h-[100%] object-cover"
                        />
                        </div>
                        <p className="text-[12px] md:text-[14px] mt-4 mb-2 light-col">{item?.createdAt}</p>
                        <h1 className="mb-2 text-[16px] md:text-[18px] font-[600] truncate">{item?.title}</h1>
                        <p className="mb-3 text-[14px] md:text-[16px] light-col truncate">{item?.content}</p>
                        <div>
                            {/* <ul className="flex flex-row text-[12px] md:text-[14px] dark-primary-col">
                                {item?.category.map((cat, index) => (
                                    <li 
                                    key={index}
                                    className="rounded-full mr-2 py-1 soft-col-bg flex justify-center 
                                    items-center px-3">{cat?.name}
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                </Link>
            ))}
            {/* <div className='w-[300px] md:w-[auto] mb-[38px]'>
                <div className='w-[100%] bg-[wheat] h-[200px] md:h-[240px] rounded-[12px]'>
                    <Image
                        alt='article'
                        src={img}
                        height={'100%'}
                        width={'100%'}
                        className="rounded-[12px] w-[100%] h-[100%] object-cover"
                    />
                     </div>
                    <p className="text-[12px] md:text-[14px] mt-4 mb-2 light-col">March 12, 2002</p>
                    <h1 className="mb-2 text-[16px] md:text-[18px] font-[600]">Ini adalah title yang sangat amat panjang sehingga sulit dibaca</h1>
                    <p className="mb-3 text-[14px] md:text-[16px] light-col">ini adalah deskripsi dari artikel yang berisikan tentang banyak hal</p>
                    <div>
                        <ul className="flex flex-row text-[12px] md:text-[14px] dark-primary-col">
                            <li className="rounded-full mr-2 py-1 soft-col-bg flex justify-center items-center px-3">Technology</li>
                            <li className="rounded-full py-1 soft-col-bg flex justify-center items-center px-3">Design</li>
                        </ul>
                    </div>
               
            </div>
            <div className='w-[300px] md:w-[auto] mb-[38px]'>
                <div className='w-[100%] h-[200px] md:h-[240px] rounded-[12px]'>
                    <Image
                        alt='article'
                        src={img}
                        height={'100%'}
                        width={'100%'}
                        className="rounded-[12px] w-[100%] h-[100%] object-cover"
                    />
                     </div>
                    <p className="text-[12px] md:text-[14px] mt-4 mb-2 light-col">March 12, 2002</p>
                    <h1 className="mb-2 text-[16px] md:text-[18px] font-[600]">Ini adalah title yang sangat amat panjang sehingga sulit dibaca</h1>
                    <p className="mb-3 text-[14px] md:text-[16px] light-col">ini adalah deskripsi dari artikel yang berisikan tentang banyak hal</p>
                    <div>
                        <ul className="flex flex-row text-[12px] md:text-[14px] dark-primary-col">
                            <li className="rounded-full mr-2 py-1 soft-col-bg flex justify-center items-center px-3">Technology</li>
                            <li className="rounded-full py-1 soft-col-bg flex justify-center items-center px-3">Design</li>
                        </ul>
                    </div>
               
            </div> */}
        </div>
    )
}