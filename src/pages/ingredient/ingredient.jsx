import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import Header from '../../components/header/header';
import ingredientStyle from './ingredient.module.css';

function IngredientPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("IngredientPage id", id);
  
  useEffect(() => {
      dispatch(getIngredients(id));
  }, []);

  return (
    <>
      <Header />
      <div className={ ingredientStyle.ingredient } >
        <IngredientDetails />
      </div>
    </>
  );
}

export default IngredientPage;
