import { useEffect } from 'react';

export function useClickOutside(elRef: any, callback: (e: any) => void) {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (elRef?.current?.contains(e.target) && callback) {
        callback(e);
      } else {
        console.log('clicked outside');
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [callback, elRef]);
}
