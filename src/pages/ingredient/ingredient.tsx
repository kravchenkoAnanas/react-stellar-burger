import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import ingredientStyle from './ingredient.module.css';

const IngredientPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("IngredientPage id", id);
  
  useEffect(() => {
      dispatch(getIngredients(id));
  }, []);

  return (
    <>
      <div className={ ingredientStyle.ingredient } >
        <IngredientDetails />
      </div>
    </>
  );
}

export default IngredientPage;
