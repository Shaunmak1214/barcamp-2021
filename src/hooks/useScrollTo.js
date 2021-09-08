import { useRef } from 'react';

const useScrollTo = () => {
  const scrollToRef = useRef(null);

  const executeScroll = () =>
    scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return { scrollToRef, executeScroll };
};

export default useScrollTo;
