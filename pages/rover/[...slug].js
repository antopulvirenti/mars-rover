import Image from "next/image";
import { useState, useEffect } from "react";
import getParams from "../../utils/getParams";
import { nextPage, prevPage, findSlug } from "../../utils/pageNavigation";
import useStore from "../../store";
import Pagination from "../../components/Pagination";
import Cameras from "../../components/Cameras";

const Photos = ({
    photos,
    cameras,
    page,
    totalPages,
    nextPage,
    prevPage,
    category,
    photo,
    date,
    cameraPhotos,
    slug,
}) => {
    const [camera, setCamera] = useState(null);
    const sortPhotos = photos.sort((a, b) => {
        return a.id - b.id;
    });
    const { addFavoritePhoto, setTotalCameraPhotos, totalCameraPhotos } =
        useStore();

    useEffect(() => {
        if (cameraPhotos != 0) {
            setTotalCameraPhotos(cameraPhotos);
        }
    }, [slug]);

    return (
        <>
            <div className="relative mt-10 md:flex md:max-h-72">
                <Cameras
                    cameras={cameras}
                    category={category}
                    photo={photo}
                    date={date}
                    setCamera={(name) => setCamera(name)}
                />
                {sortPhotos.length != 0 ? (
                    <div className="grid grid-cols-10 gap-4 mx-5">
                        {photos.map((photo, i) => {
                            if (page === 1 && i >= 25) return;
                            return (
                                <div
                                    key={photo.id}
                                    className="col-span-10 text-center sm:col-span-5 md:col-span-2"
                                >
                                    <Image
                                        src={photo.img_src}
                                        alt="img"
                                        width={500}
                                        height={500}
                                    />
                                    <p className="pb-2 italic font-bold">
                                        {photo.camera.full_name}
                                    </p>
                                    <button
                                        onClick={() => addFavoritePhoto(photo)}
                                        className="w-full p-1 text-sm text-white lg:text-base bg-cyan-600"
                                    >
                                        Add to my favorite photos
                                    </button>
                                </div>
                            );
                        })}

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            camera={camera}
                            totalCameraPhotos={totalCameraPhotos}
                        />
                    </div>
                ) : (
                    <div className="w-full m-auto text-xl font-bold text-center md_mt-0">
                        There are no photos with the{" "}
                        <span className="text-cyan-600">{camera}</span> camera.
                    </div>
                )}
            </div>
        </>
    );
};

export const getStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const [category, photo, date] = slug;
    const regex = /[cp]-/g;
    const params = getParams(slug, regex);

    const { photos } = await fetch(
        `${process.env.API_URL}/${category}/${photo}?${params.toString()}`
    ).then((r) => r.json());

    const { rovers } = await fetch(
        `${process.env.API_URL}?api_key=${process.env.API_KEY}`
    ).then((r) => r.json());

    const rover = rovers.map((r) => {
        if (r.name.toLowerCase() === category) {
            return r;
        }
    });

    const cameraPhotos = () => {
        if (findSlug("c-", slug) && !findSlug("p-", slug)) {
            return Math.ceil(photos.length / 25);
        } else {
            return 0;
        }
    };
    const page = findSlug("p-", slug)
        ? findSlug("p-", slug).replace(regex, "")
        : 1;

    const pageNavigation = {
        nextPage: nextPage(slug, page, regex),
        prevPage: prevPage(slug, page, regex),
    };

    const totalPages = Math.ceil(rover[0].total_photos / 25);

    return {
        props: {
            cameras: rover[0].cameras,
            cameraPhotos: cameraPhotos(),
            photos,
            page,
            totalPages,
            nextPage: pageNavigation.nextPage,
            prevPage: pageNavigation.prevPage,
            category,
            photo,
            date,
            slug,
        },
        revalidate: 360 * 10, // 1 hour
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export default Photos;
