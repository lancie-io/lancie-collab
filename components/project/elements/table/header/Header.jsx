import { TableHead } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { Constants } from '../utils';
import AddColumnHeader from './AddColumnHeader';
import DataTypeIcon from './DataTypeIcon';
import HeaderMenu from './HeaderMenu';

export default function Header({
  column: { id, created, label, dataType, getResizerProps, getHeaderProps },
  setSortBy,
  dataDispatch,
}) {
  const [showHeaderMenu, setShowHeaderMenu] = useState(created || false);
  const [headerMenuAnchorRef, setHeaderMenuAnchorRef] = useState(null);
  const [headerMenuPopperRef, setHeaderMenuPopperRef] = useState(null);
  const headerMenuPopper = usePopper(headerMenuAnchorRef, headerMenuPopperRef, {
    placement: 'bottom',
    strategy: 'absolute',
  });

  /* when the column is newly created, set it to open */
  useEffect(() => {
    if (created) {
      setShowHeaderMenu(true);
    }
  }, [created]);

  function getHeader() {
    if (id === Constants.ADD_COLUMN_ID) {
      return (
        <AddColumnHeader
          dataDispatch={dataDispatch}
          getHeaderProps={getHeaderProps}
        />
      );
    }

    return (
      <>
        <TableHead {...getHeaderProps()} className="noselect">
          <div
            className="flex h-full text-sm items-center gap-1.5 text-left font-medium text-muted-foreground"
            onClick={() => setShowHeaderMenu(true)}
            ref={setHeaderMenuAnchorRef}
          >
            <DataTypeIcon dataType={dataType} />
            {label}
          </div>
          <div {...getResizerProps()} className="resizer" />
        </TableHead>
        {showHeaderMenu && (
          <div className="overlay" onClick={() => setShowHeaderMenu(false)} />
        )}
        {showHeaderMenu && (
          <HeaderMenu
            label={label}
            dataType={dataType}
            popper={headerMenuPopper}
            popperRef={setHeaderMenuPopperRef}
            dataDispatch={dataDispatch}
            setSortBy={setSortBy}
            columnId={id}
            setShowHeaderMenu={setShowHeaderMenu}
          />
        )}
      </>
    );
  }

  return getHeader();
}
