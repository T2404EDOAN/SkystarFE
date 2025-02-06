import React from "react";
import "./TrailerModal.css";

interface TrailerModalProps {
  trailerUrl: string;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ trailerUrl, onClose }) => {
  // Extract video ID from YouTube URL if needed
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  };

  const videoId = getYouTubeVideoId(trailerUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="trailer-modal-overlay" onClick={handleOverlayClick}>
      <div className="trailer-modal-container">
        <button onClick={onClose} className="trailer-close-button">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe
          src={embedUrl}
          className="trailer-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default TrailerModal;
