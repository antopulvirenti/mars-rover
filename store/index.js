import create from "zustand";
import {persist} from "zustand/middleware"

const [useStore] = create(persist((set) => ({
    favoritePhotos: [],
    addFavoritePhoto: (photo) =>
        set((state) => ({ favoritePhotos: [...state.favoritePhotos, photo] })),
    totalCameraPhotos: 0,
    setTotalCameraPhotos: (totalPhotos) => set({ totalCameraPhotos: totalPhotos }),
    amountPages: 0,
    setAmountPages: (pages) => set({ amountPages: pages }),
})));


export default useStore;
