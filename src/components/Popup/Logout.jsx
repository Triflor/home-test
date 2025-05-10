
export default function Logout ({setShow, handleLogout}) {

    return (
        <div className={`w-[100%] fixed h-full bg-alert flex justify-center items-center z-[40]`}>
            <div className="w-[70%] ml-[-7%] md:ml-0 md:w-[400px] bg-[white] p-5 rounded-md h-[150px] flex flex-col z-[50]">
                <h1 className="font-[500] mb-3 text-[16px] md:text-[20px]">Logout</h1>
                <p className="mb-3 text-[14px] darker-col">
                    Are you sure want to logout?
                </p>
                <div className="flex md:text-[14px] text-[12px] flex-row w-[100%] justify-end">
                    <button
                     onClick={() => setShow(false)}
                     className="mr-2 cursor-pointer w-[70px] h-[36px] flex justify-center items-center rounded-md border border-slate">
                     Cancel</button>
                    <button 
                     onClick={() => handleLogout()}
                     className="cursor-pointer w-[70px] h-[36px] flex justify-center items-center primary-col-bg text-white rounded-md">
                     Logout</button>
                </div>
            </div>
        </div>
    )
}