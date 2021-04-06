import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import './Listings.css';

export default function PaginationControlled({ total, pageSize, page, onPageChange }) {
  const [count, setCount] = useState(1);

  const calculateCount = () => {
    let result = 1;
    if (total > pageSize) {
      if (total % pageSize) {
        result = Math.floor(total / pageSize) + 1;
      } else {
        result = Math.floor(total / pageSize);
      }
    }
    setCount(result);
  };

  useEffect(calculateCount, [total, pageSize]);

  return (
    <div>
      <Pagination color='primary' count={count} page={page} onChange={(event, value) => onPageChange(value)} />
    </div>
  );
}
