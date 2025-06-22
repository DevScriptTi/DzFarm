import { getTranslations } from "next-intl/server";
import { LandingPicterOne, LandingPicture } from "./landingCom";
import Link from "next/link";
import Button from "@/components/Buttons/Button";

export default async function Landing() {
    const t = await getTranslations('HomePage')
    return (
        <>
            <div
                className="h-[calc(100vh_-_65px)] mt-header flex items-center lg:gap-8  px-8"
            >
                <div className="text-display-large w-full lg:w-1/2 flex flex-col gap-6">
                    <h1
                        className="text-display-medium lg:text-display-large text-on-background dark:text-dark-on-background"
                    >
                        {t('title')}
                    </h1>
                    <div
                        className="flex flex-col gap-3"
                    >
                        <p
                            className="text-body-medium lg:text-body-large text-on-background dark:text-dark-on-background"
                        >
                            {t('description')}
                        </p>
                        <Link href={'/join'}>
                            <Button mode="filled">
                                {t('joinus')}
                            </Button>
                        </Link>
                    </div>
                </div>
                <LandingPicture />

            </div>
        </>
    )
}

