// components/SimilarNewsButton.tsx
// components/newsComponent/SimilarNewsButton.jsx
const SimilarNewsButton = ({ onClick }) => {
    const handleClick = (e) => {
        console.log("Button clicked!");  // Basic console log
        e.stopPropagation();
        onClick();
    };

    return (
        <button
            className="similarNewsButton"
            onClick={handleClick}
        >
            Get Similar News
        </button>
    );
};

export default SimilarNewsButton;