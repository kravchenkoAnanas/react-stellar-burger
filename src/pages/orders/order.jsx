import { useParams } from 'react-router-dom';

function OrderPage() {
  const { id } = useParams();

  return (
    <h1 align='center'>OrderPage # { id } </h1>
  );
}

export default OrderPage;
