/* Decorator to add react-tween-state to class */
import Animate from 'react-tween-state';

export default SubComponent => {
  Object.assign(SubComponent.prototype, Animate.Mixin);
  return SubComponent;
};
