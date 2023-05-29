import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import constructorItemStyle from './constructor-item.module.css'

function ConstructorItem({ element }) {
  return (
    <div className={ constructorItemStyle.constructor_item }>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ element.name }
        price={ element.price }
        thumbnail={ element.image }
        />
    </div>
  )
}

ConstructorItem.propTypes = {
  element: PropTypes.object
}
export default ConstructorItem;