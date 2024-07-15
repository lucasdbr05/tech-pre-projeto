import Image from "next/image";
import accountPhoto from "../../../public/accountPhoto.png";
import searchIcon from "../../../public/search.png";
import bagIcon from "../../../public/shopping-bag.png"
import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
    const { data } = useSession();

    return (
        <nav className="w-screen h-[10vh] p-2 flex flex-row items-center justify-between">
            <div className="w-2/3 md:w-1/3 h-full flex flex-row items-center justify-evenly" >
                <h2 className="text-xl md:text-3xl font-bold mr-2">devstore</h2>
                <div className="h-[70%] w-2/3 md:w-2/3 relative">
                    <Image className="absolute left-4 top-[24%]" src={searchIcon} alt="search Icon" width={20} height={20} />
                    <input className="h-full w-full bg-[#18181B] rounded-3xl p-3 px-10 md:px-11"
                        type="text" placeholder="Buscar produtos..." />
                </div>
            </div>

            <div className="w-[20%] md:w-[15%] h-full flex flex-col md:flex-row items-center justify-evenly mr-4 md:mr-10 xl:mr-2">
                {data ? <>
                    <div className="w-full md:w-1/2 h-full flex flex-row items-center justify-evenly">
                        <Image src={bagIcon} alt="Bag Shopping Icon" width={20} height={20} />
                        <h3 className="text-md whitespace-nowrap">Cart (3)</h3>
                    </div>
                    <p className="text-[#3F3F46] hidden md:flex">|</p>
                    <div className="w-full md:w-1/2 h-full flex flex-row items-center justify-evenly ">
                        <h3 className="text-lg md:text-md">{data?.user?.name}</h3>
                        <Image onClick={() => signOut()} src={accountPhoto} alt="Profile Pic" height={25} width={25} className="" />
                    </div>
                </> : <>
                        <Link href={'/sign-up'} className="w-full h-1/3 lg:w-[45%] lg:h-1/2">
                            <Button sx={{ fontSize: "15px"}} variant="outlined" size="small" className="w-full h-full whitespace-nowrap" >
                                Sign-up
                            </Button>
                        </Link>
                        <Link href={"/login"} className="w-full h-1/3 lg:w-[45%] lg:h-1/2">
                            <Button sx={{ fontSize: '15px' }} variant="contained" size="large" className="w-full h-full whitespace-nowrap">
                                Login
                            </Button>
                        </Link>
                </>
                }
            </div>
        </nav>
    )

}
