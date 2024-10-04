import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/api.js";
import Loader from "./components/Loader/Loader";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] =
    useState(1);
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [selectedImage, setSelectedImage] =
    useState(null);
  const [totalImages, setTotalImages] =
    useState(0);
  const imagesPerPage = 12;

  useEffect(() => {
    if (!query) return;
    const getImages = async () => {
      setLoading(true);
      try {
        const { results, total } =
          await fetchImages(
            query,
            currentPage,
            imagesPerPage
          );
        setImages((prevImages) => [
          ...prevImages,
          ...results,
        ]);
        setTotalImages(total);
      } catch (error) {
        console.error(
          "Error featching images:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, currentPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onImagesClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const hasMoreImages =
    images.length < totalImages;
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      <ImageGallery
        images={images}
        onImagesClick={onImagesClick}
      />
      {!loading &&
        images.length > 0 &&
        hasMoreImages && (
          <LoadMoreBtn onClick={loadMore} />
        )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
        image={selectedImage}
      />
    </>
  );
}

export default App;
