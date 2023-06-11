import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import constructorItemStyle from './constructor-item.module.css'
import { useDispatch } from 'react-redux';
import { DEL_CHOSEN_INGREDIENT } from '../../services/actions';

function ConstructorItem({ element }) {
  const dispatch = useDispatch();

  return (
    <div className={ constructorItemStyle.constructor_item }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ element.name }
        price={ element.price }
        thumbnail={ element.image }
        handleClose={ () => {
          dispatch({
            type: DEL_CHOSEN_INGREDIENT,
            uuid: element.uuid
          })
        }}
        />
    </div>
  )
}

ConstructorItem.propTypes = {
  element: PropTypes.object
}
export default ConstructorItem;