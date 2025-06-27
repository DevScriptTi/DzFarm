import Mode from "@/components/local/Navs/Mode";
import UpBar from "@/components/Navigations/NavBar/NavBar";
import NavBarGroup from "@/components/Navigations/NavBar/NavBarGroupd";
import NavBarItem from "@/components/Navigations/NavBar/NavBarItem";
import { ScanQrCode } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function layout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale()
    return (
        <>
            <UpBar>
                <NavBarGroup>
                    <NavBarItem link={`/${locale}/farmers`} >Home</NavBarItem>
                    {/* <NavBarItem link={`/${locale}/farmers/vaccines`} >Vaccines</NavBarItem>
                    <NavBarItem link={`/${locale}/farmers/illnesses`} >Illnesses</NavBarItem> */}
                    <NavBarItem link={`/${locale}`} >Leave</NavBarItem>
                    <Mode />
                    <NavBarItem link={`/${locale}/farmers/animals/scan`} >
                        <div className="flex items-center h-full">
                            <ScanQrCode />
                        </div>
                    </NavBarItem>
                </NavBarGroup>
            </UpBar>
            {children}
        </>
    )
}