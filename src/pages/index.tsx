import Head from 'next/head'
import {LandingFormView} from "@/components/LandingFormView";
import {TabsLayout} from "@/layouts";

const Home = () => {
    return (
        <>
            <Head>
                <meta property="og:title" content="Giveaid"/>
                <meta property="og:site_name" content="Giveaid"/>
                <meta property="og:url" content="https://giveaid.vercel.app"/>
                <meta property="og:description" content="New locally, make a difference globally."/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="https://giveaid.vercel.app/give_ad.png"/>
                <title>Giveaid App</title>
                <meta name="description" content="Next JS Starter"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <LandingFormView/>
            </main>
        </>
    )
}

Home.pageLayout = TabsLayout;

export default Home