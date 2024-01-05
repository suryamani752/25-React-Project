import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [CurrentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImage(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
      const data = await response.json();
      //   console.log(data);
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchImage(url);
    }
  }, [url]);
  //   console.log(images);
  if (loading) {
    return <div>please wait data is loading</div>;
  }
  if (errorMessage !== null) {
    return <div>some error occured {errorMessage}</div>;
  }
  function handlePrevious() {
    setCurrentSlide(CurrentSlide === 0 ? images.length - 1 : CurrentSlide - 1);
  }
  function handleNext() {
    setCurrentSlide(CurrentSlide === images.length - 1 ? 0 : CurrentSlide + 1);
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length > 0
        ? images.map((image, index) => (
            <img
              key={image.id}
              src={image.download_url}
              alt={image.download_url}
              className={
                CurrentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicator">
        {images && images.length > 0
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  CurrentSlide === index
                    ? "current-indicator"
                    : "current-indicator update-current-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
