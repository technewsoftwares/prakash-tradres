import PropTypes from 'prop-types';
import { createContext, useState } from "react"

export const ContextProvider = createContext();
const Context = ({ children }) => {
	const [isAuth, setIsAuth] = useState(!localStorage.getItem("token") ? false : true);
	const [token, setToken] = useState(localStorage.getItem("token"));

	return (
		<ContextProvider.Provider value={{ isAuth, setIsAuth, token, setToken }}>
			{children}
		</ContextProvider.Provider>
	)
}
Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
