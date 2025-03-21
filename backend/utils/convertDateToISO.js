import moment from "moment";

// Metoda dokonująca konwersji między formatem "DD-MM-YYYY" a formatem ISO
const convertToISODateWithMoment = (dateString) => {
    const momentDate = moment.utc(dateString, "DD-MM-YYYY", true);
    
    if (!momentDate.isValid()) {
      return null; // Nieprawidłowa data
    }
    
    return momentDate.toISOString();
  };

export default convertToISODateWithMoment;