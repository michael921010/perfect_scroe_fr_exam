export default function HomeIcon({ className, fill }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.34146 2C7.51304 2 6.84146 2.67157 6.84146 3.5C6.84146 4.32843 7.51304 5 8.34146 
        5H18.7578V14.4233C18.7578 15.2518 19.4294 15.9233 20.2578 15.9233C21.0863 15.9233 21.7578 
        15.2518 21.7578 14.4233V4.5C21.7578 3.11929 20.6386 2 19.2578 2H8.34146ZM3 6.91463H16.122C16.6742 6.91463 
        17.122 7.36235 17.122 7.91463V21.0366C17.122 21.5889 16.6742 22.0366 16.122 22.0366H3C2.44772 
        22.0366 2 21.5889 2 21.0366V7.91463C2 7.36235 2.44772 6.91463 3 6.91463Z"
      />
    </svg>
  );
}

HomeIcon.defaultProps = {
  fill: "#8A8A8F",
};
