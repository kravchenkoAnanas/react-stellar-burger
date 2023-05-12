import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function ConstructorItem({ element }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', alignItems: "center" }}>
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