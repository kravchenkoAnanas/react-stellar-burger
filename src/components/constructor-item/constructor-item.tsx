import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorItemStyle from './constructor-item.module.css'
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector, useDispatch } from './../../services/hooks';
import { DEL_CHOSEN_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { FC, useRef } from 'react';
import { UPD_INGREDIENTS } from '../../services/actions/ingredients';

interface ConstructorItemProps {
  index: number;
  element: any;
}

const ConstructorItem: FC<ConstructorItemProps> = ({ index, element }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const { chosenIngredients } = useSelector((state: any) => state.burgerConstructor);

  const [{ isDrag }, dragRef] = useDrag({
    type: "innerIngredient",
    item: { index, element },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "innerIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)
      dispatch({
        type: MOVE_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

  // const opacity = isDrag ? 0 : 1
  dragRef(dropRef(ref));

  return (
    <div className={ constructorItemStyle.constructor_item } ref={ ref }>
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
          dispatch({
            type: UPD_INGREDIENTS,
            ingredientIds: chosenIngredients
              .map((ingredient: any) => ingredient._id)
              .filter((idx: any) => idx !== element._id)
          });
        }}
        />
    </div>
  )
}

export default ConstructorItem;