import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";

const Home = ({ rovers }) => {
    const router = useRouter();
    const [params, setParams] = useState({
        category: null,
        maxSol: 0,
        minEarthDate: 0,
        maxEarthDate: 0,
    });
    const [sol, setSol] = useState(0);
    const [earthDate, setEarthDate] = useState(0);
    const [error, setError] = useState({ sol: false, earthDate: false });

    const pageNavigation = {
        sol: `/rover/${params.category}/photos/sol=${sol}`,
        earthDate: `/rover/${params.category}/photos/earth_date=${earthDate}`,
    };

    const handleClick = (name, maxSol, maxDate, minDate) => {
        setParams({
            category: name.toLowerCase(),
            maxSol: maxSol,
            maxEarthDate: maxDate,
            minEarthDate: minDate,
        });
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            router.push(
                sol != 0 ? pageNavigation.sol : pageNavigation.earthDate
            );
        }
    };
    const validateSol = (input) => {
        if (input < 1 || input > params.maxSol) {
            setError({ ...error, sol: true });
        }else{
            setError({ ...error, sol: false });
        }
    };
    const validateEarthDate = (input) => {
        if (input < params.minEarthDate || input > params.maxEarthDate) {
            setError({ ...error, earthDate: true });
        }else{
            setError({ ...error, earthDate: false });
        }
    };
    
    return (
        <div>
            <Head>
                <title>Mars Rover</title>
                <link rel="icon" href="/nasaLogo.svg" />
            </Head>
            <div className="flex items-center justify-center mt-52">
                {rovers.map((r, i) => {
                    if (i >= 3) return;
                    return (
                        <div key={r.id} className="m-2">
                            <button
                                className={cx(
                                    "p-2 text-2xl border-2 rounded-md border-cyan-600 hover:bg-cyan-600 hover:text-white",
                                    {
                                        "bg-cyan-600 text-white":
                                            r.name.toLowerCase() ===
                                            params.category,
                                    }
                                )}
                                onClick={() =>
                                    handleClick(
                                        r.name,
                                        r.max_sol,
                                        r.max_date,
                                        r.landing_date
                                    )
                                }
                            >
                                {r.name}
                            </button>
                        </div>
                    );
                })}
            </div>
            {params.category != null && (
                <div
                    className="grid max-w-4xl grid-cols-12 gap-2 m-auto mt-10"
                    onKeyDown={handleKeyPress}
                >
                    <div className="col-span-12 lg:col-span-6">
                        <p className="font-bold">Sol year</p>
                        <input
                            type="text"
                            placeholder={`Write a number between 1 and ${params.maxSol}`}
                            className="w-full p-2 border rounded-md border-cyan-600"
                            onChange={() => {
                                setSol(event.target.value);
                                validateSol(event.target.value);
                                console.log()
                            }}
                        />
                        {error.sol && (
                            <p className="text-red-500">
                                Write a number between 1 and {params.maxSol}
                            </p>
                        )}
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <p className="font-bold">Earth date</p>
                        <input
                            type="date"
                            className="w-full p-2 border rounded-md border-cyan-600"
                            onChange={() => {
                                setEarthDate(event.target.value);
                                validateEarthDate(event.target.value);
                                console.log(event.target.value < params.minEarthDate || event.target.value > params.maxEarthDate)
                            }}
                        />
                        
                            <p className={cx("text-sm text-center",{"text-red-500":error.earthDate, "text-gray-600": !error.earthDate})}>
                                Write a number between {params.minEarthDate} and{" "}
                                {params.maxEarthDate}
                            </p>
                    </div>
                    <Link
                        href={
                            sol != 0
                                ? pageNavigation.sol
                                : earthDate != 0
                                ? pageNavigation.earthDate
                                : ""
                        }
                    >
                        <a className="flex items-center justify-center col-span-12 py-2 text-lg font-bold text-white rounded-lg bg-cyan-600">
                            Search
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
};

export const getStaticProps = async () => {
    const { rovers } = await fetch(
        `${process.env.API_URL}?api_key=${process.env.API_KEY}`
    ).then((r) => r.json());

    return {
        props: {
            rovers,
        },
        revalidate: 360 * 10,
    };
};

export default Home;
