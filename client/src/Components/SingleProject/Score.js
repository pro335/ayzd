import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

/* This example requires Tailwind CSS v2.0+ */

export default function Score() {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="p-4 sm:p-5 space-y-4">
      
    </div>
  )
}
