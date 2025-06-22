import { UpBarItem } from "@/components/local/Navs/UpBar/UpBarItem";
import UpBar from "@/components/local/Navs/UpBar/UpBar";
import { getLocale, getTranslations } from "next-intl/server";
import { isAdmin, isAuth, isFarmer, isVeterinary } from "@/lib/server/tools/auth";

export default async function layout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const t = await getTranslations('HomePage.UpBar')
    return (
        <>
            <UpBar>
                <UpBarItem href={`/${locale}`}>{t('home')}</UpBarItem>
                {
                    await isAuth() && (
                        <>
                            {
                                await isAdmin() && (
                                    <UpBarItem href={`/${locale}/dashboard`}>{t('dashboard')}</UpBarItem>
                                )
                            }
                            {
                                await isFarmer() && (
                                    <UpBarItem href={`/${locale}/farmers`}>{t('dashboard')}</UpBarItem>
                                )
                            }
                            {
                                await isVeterinary() && (
                                    <UpBarItem href={`/${locale}/veterinaries`}>{t('dashboard')}</UpBarItem>
                                )
                            }
                        </>
                    )
                }
                <UpBarItem href={`/${locale}/animals`}>{"Animals"}</UpBarItem>
                <UpBarItem href={`/${locale}/veterinaries`}>{"Veterinaries"}</UpBarItem>
            </UpBar>
            {children}
        </>
    )
}