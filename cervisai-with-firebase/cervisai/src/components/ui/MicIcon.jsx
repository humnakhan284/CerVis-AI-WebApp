// src/components/ui/MicIcon.jsx
export default function MicIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 2a.5.5 0 0 0-.5.5V4H8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v.17A6.001 6.001 0 0 0 12 22a6 6 0 0 0 3-11.17V12h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-1V2.5a.5.5 0 0 0-.5-.5h-5zM9 5h6v6H9V5zm3 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM6 21a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2H6z" />
    </svg>
  );
}
