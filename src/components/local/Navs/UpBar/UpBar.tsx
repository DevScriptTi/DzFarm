import { getLocale, getTranslations } from "next-intl/server";
import Lang from "../Lang"
import Mode from "../Mode"
import { UpBarItem } from "./UpBarItem"
import ToggleUpBar from "./ToggelUpBar";
import { isAuth } from "@/lib/server/tools/auth";
import Logout from "./logout";
import Image from "next/image";

export default async function UpBar({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const t = await getTranslations('HomePage.UpBar')
    return (
        <header
            className="sticky z-10  h-header w-full px-2 md:px-4 lg:px-8 flex items-center"
        >
            <UpBarItem href={`/${locale}`} >
                <Image src={'/logo.png'} alt="logo" className="w-24" width={500} height={500}/>
            </UpBarItem>
            <Mode />
            <Lang />
            <nav id="NavBarItemsToggled" className="hidden lg:grow
            absolute top-header start-2 w-[calc(100%_-_16px)] lg:static lg:bg-transparent lg:dark:bg-transparent lg:flex lg:justify-center  bg-surface-container  dark:bg-dark-surface-container 
            ">
                <ul className="flex flex-col  lg:flex-row lg:items-center">
                    {children}
                </ul>
            </nav>
            <div
                className="grow flex justify-end items-center "
            >
                {
                    !(await isAuth()) ? (
                        <>
                            <UpBarItem href={`/${locale}/login`} className="text-on-surface dark:text-dark-on-surface">{t('login')}</UpBarItem>
                            <UpBarItem href={`/${locale}/register`} className="text-on-surface dark:text-dark-on-surface" >{t('register')}</UpBarItem>
                        </>
                    ):(
                        <Logout/>
                    )
                }
                <ToggleUpBar />
            </div>
        </header>
    )
}




