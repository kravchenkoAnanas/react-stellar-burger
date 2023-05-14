import ingredientDetailsStyle from './ingredient-details.module.css'
import PropTypes from 'prop-types';

function IngredientDetails({ element }) {
  return (
    <div className={ ingredientDetailsStyle.container } >
      <h2 className="text text_type_main-large mt-10 mr-25 ml-10">Детали ингридиента</h2>
      <div className={ ingredientDetailsStyle.content }>
        <img className={ ingredientDetailsStyle.image } src={ element.image } alt={ element.name } />
        <h3 className="text text_type_main-small mt-4 mb-8">{ element.name }</h3>
        <div className={`${ ingredientDetailsStyle.nutrients } mb-4`}>
          <div className="text text_type_main-default text_color_inactive">
            <p>Калории,ккал</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ element.calories }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Белки, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ element.proteins }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Жиры, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ element.fat }</p>
          </div>
          <div className="text text_type_main-default text_color_inactive">
            <p>Углеводы, г</p>
            <p className={`${ ingredientDetailsStyle.number } text text_type_digits-default`}>{ element.carbohydrates }</p>
          </div>

        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  element: PropTypes.object,
}
export default IngredientDetails;