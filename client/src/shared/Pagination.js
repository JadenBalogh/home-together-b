import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Pagination count={10} color='primary' page={page} onChange={handleChange} />
    </div>
  );
}
