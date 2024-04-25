import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Création du contexte avec une valeur par défaut pour last
const DataContext = createContext({
      last: {
      cover: "",
      title: "",
      date: ""
    }
  });

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

// Fonction pour récupérer les données
const getData = useCallback(async () => {
  try {
    const fetchedData = await api.loadData();
    setData(fetchedData);
  } catch (err) {
    setError(err);
  }
}, []);

// Appel de getData lors du montage du composant
useEffect(() => {    
  getData();    
}, [getData]);
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // "last" est défini comme le dernier événement dans les données, s'il existe
        last: data && data.events ? data.events[data.events.length - 1] : {}
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
