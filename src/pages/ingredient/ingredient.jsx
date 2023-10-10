import { useParams } from 'react-router-dom';


function IngredientPage() {
  const { id } = useParams();

  return (
    <h1 align='center'>IngredientsPage # { id } </h1>
  );
}

export default IngredientPage;
