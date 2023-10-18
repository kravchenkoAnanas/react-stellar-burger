import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import Header from '../../components/header/header';

function IngredientPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { ingredients } = useSelector(state => state.ingredients);
  
  useEffect(() => {
      dispatch(getIngredients(id));
  }, []);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "150px" }} >
        <IngredientDetails />
      </div>
    </>
  );
}

export default IngredientPage;
