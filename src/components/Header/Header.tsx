import Image from "next/image";
import accountPhoto from "../../../public/accountPhoto.png";
import searchIcon from "../../../public/search.png";
import bagIcon from "../../../public/shopping-bag.png"

export default function Header() {
    
    return (
        <nav className="w-screen h-[10vh] p-2 flex flex-row items-center justify-between">
            <div className="w-2/3 md:w-1/3 h-full flex flex-row items-center justify-evenly" >
                <h2 className="text-xl md:text-3xl font-bold mr-2">devstore</h2>
                <div className="h-[70%] w-2/3 md:w-2/3 relative">
                    <Image className="absolute left-4 top-[24%]" src={searchIcon} alt="search Icon"  width={20} height={20}/>
                    <input className="h-full w-full bg-[#18181B] rounded-3xl p-3 px-10 md:px-11"
                        type="text" placeholder="Buscar produtos..." />
                 </div>
            </div>

            <div className="w-[20%] md:w-[15%] h-full flex flex-col md:flex-row items-center justify-evenly mr-4 md:mr-10 xl:mr-2">
                <div className="w-full md:w-1/2 h-full flex flex-row items-center justify-evenly">
                    <Image src={bagIcon} alt="Bag Shopping Icon" width={20} height={20} />
                    <h3 className="text-md whitespace-nowrap">Cart (3)</h3>
                </div>
                <p className="text-[#3F3F46] hidden md:flex">|</p>
                <div className="w-full md:w-1/2 h-full flex flex-row items-center justify-evenly ">
                    <h3 className="text-lg md:text-md">Account</h3>
                    <Image src={accountPhoto} alt="Profile Pic" height={25} width={25} className=""/>
                </div>
            </div>
        </nav>
    )

}