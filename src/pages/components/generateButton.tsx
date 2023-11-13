interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton = ({ onClick }: GenerateButtonProps) => {
  return (
    <button
      className="text-white p-2 rounded-sm border border-gray-500"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="black"
        className="bi bi-lightning"
        viewBox="0 0 16 16"
      >
        <path d="M8 1v7h3l-4 8v-5H4l4-8V1z" />
      </svg>
    </button>
  );
};

export default GenerateButton;
