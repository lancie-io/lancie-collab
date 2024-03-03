import { useCallback, useEffect } from 'react';

function checkIfChildHasParentWithId(child: Node, parentId: string) {
  let el = child.parentElement;
  console.log('parentId', parentId);
  while (el !== null) {
    if (el.id.startsWith(parentId)) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

export const useClickOutside = (ref: any, callback: any, parentId: string) => {
  const handleClick = useCallback(
    (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('parentId', parentId);
        console.log('child', e.target);
        const isAnOutsideElement = checkIfChildHasParentWithId(
          e.target,
          parentId
        );
        const isPopover = checkIfChildHasParentWithId(
          e.target,
          'popover-content'
        );
        console.log('isPopover', isPopover);
        if (!isAnOutsideElement && !isPopover) {
          callback(e);
        }
        return;
      }
    },
    [ref, callback]
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export const useClickOutsideCell = (
  ref: any,
  callback: any,
  parentId: string
) => {
  const handleClick = (e: any) => {
    console.log('fired cb');

    // if (ref.current && !ref.current.contains(e.target)) {
    //   const isAnOutsideElement = checkIfChildHasParentWithId(
    //     e.target,
    //     parentId
    //   );
    //   if (isAnOutsideElement) {
    //     console.log('fired outside cell');
    //     callback(e);
    //   }
    //   return;
    // }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
