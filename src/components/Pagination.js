import Link from "next/link";
import Image from "next/image";

const Pagination = ({
    page,
    amountPages,
    prevPage,
    nextPage,
    camera,
    totalCameraPhotos,
}) => {
    const totalPages = camera  ? totalCameraPhotos : amountPages
    return (
        <div className="flex items-center justify-center col-span-10 py-10">
            {page > 1 && (
                <Link href={prevPage}>
                    <a className="mt-2">
                        <Image
                            src="/leftArrow.svg"
                            alt="arrowLeft"
                            width={20}
                            height={20}
                        />
                    </a>
                </Link>
            )}
            <p className="w-32 text-2xl text-center">
                {page} / {totalPages}
            </p>
            {page !== totalPages && (
                <Link href={nextPage}>
                    <a className="mt-2">
                        <Image
                            src="/rightArrow.svg"
                            alt="arrowRight"
                            width={20}
                            height={20}
                        />
                    </a>
                </Link>
            )}
        </div>
    );
};

export default Pagination;
