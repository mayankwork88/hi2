import {useState} from 'react';
import useUtils from './useUtils';

const useViewEmployeeDetails = () => {
    const [viewSelectedEmployee, setViewSelectedEmployee] = useState({});
    const {getSelectedEmployee} = useUtils();
    const handleViewEmployeeDetails = (employeeId) => {
        handleEventType("view");
        const selectedEmployee = getSelectedEmployee(state, employeeId);
        setViewSelectedEmployee(selectedEmployee);
        handleModalClose();
      };
  return {handleViewEmployeeDetails}
}

export default useViewEmployeeDetails;
