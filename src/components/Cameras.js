import Link from "next/link";

const Cameras = ({ cameras, category, photo, date, setCamera }) => {
    return (
        <div className="w-full pt-5 mb-10 text-white md:mb-0 md:w-64 bg-cyan-600">
            <p className="text-lg font-bold text-center ">Cameras</p>
            <div className="w-20 h-0.5 m-auto bg-black md:mb-5 mb-2" />
            <div className="grid grid-cols-3 pb-2 text-center md:grid-cols-none md:text-left">
                {cameras.map(({ name }) => {
                    return (
                        <div
                            key={name}
                            className="pb-1 md:pl-6 md:pr-5 xl:pl-12 hover:underline"
                            onClick={() => setCamera(name)}
                        >
                            <Link
                                href={`${category}/${photo}/${date}/c-${name}`}
                            >
                                {name}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cameras;
