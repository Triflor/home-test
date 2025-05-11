export default function SuccessReg ({text}) {
    return (
        <>
            <div 
            className="w-[85%] md:w-[364px] h-[60px] mb-[15rem] bg-trans-danger rounded-md absolute  
            bg-white drop-shadow-md flex py-2 flex-col justify-center items-center">
                <h2 className="font-[500]  text-[15px]">{text}</h2>
                <p className="text-[13px]">Please Try Again.</p>
            </div>        
        </>
    )
}