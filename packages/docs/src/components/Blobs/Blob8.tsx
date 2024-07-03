interface Blob8Props {
  className: string;
}

export const Blob8: React.FC<Blob8Props> = ({ className }: Blob8Props) => {
  return (
    <svg
      width="704"
      height="580"
      viewBox="0 0 704 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M356.771 1.18665C418.531 -6.48376 480.237 24.0764 529.042 62.6913C575.389 99.3607 592.514 158.288 620.869 210.141C651.73 266.576 700.529 316.226 702.837 380.507C705.308 449.336 695.548 540.267 633.819 570.814C565.1 604.82 489.844 530.055 413.433 523.722C372.61 520.339 334.932 549.496 294.539 542.694C251.268 535.409 218.042 505.354 179.523 484.337C117.836 450.678 3.88519 452.203 0.0916788 382.033C-3.88111 308.547 122.354 302.732 166.522 243.866C196.756 203.573 178.888 141.964 209.968 102.32C247.387 54.588 296.583 8.6619 356.771 1.18665Z"
      />
    </svg>
  );
};
