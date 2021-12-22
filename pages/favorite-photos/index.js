import useStore from "../../store";
import Image from "next/image";

const FavoritePhotos = () => {
    const { favoritePhotos } = useStore();
    return (
        <div className="grid grid-cols-10 gap-4 m-5">
            {favoritePhotos.map((photo) => {
                return (
                    <div
                        key={photo.id}
                        className="col-span-10 text-center sm:col-span-2"
                    >
                        <Image
                            src={photo.img_src}
                            alt="img"
                            width={500}
                            height={500}
                        />
                        <p>{photo.camera.full_name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default FavoritePhotos;
