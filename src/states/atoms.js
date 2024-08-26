import { atom } from 'recoil';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';


export const loginState = atom({

 key: 'loginState',
    
    default: {
    
    email: '',
    
    password: '',
    
    },
    
 });
export const registerState = atom({
    
 key: 'registerState',
 default: {
     username: '',
    
     firstName: '',
    
     lastName: '',
    
     email: '',
    
    password: ''
    
    }
     });
// states/atoms.js


// Initialize state from local storage
const initialUserState = loadFromLocalStorage('user') || null;

export const userState = atom({
  key: 'userState',
  default: initialUserState,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage('user', newValue);
      });
    },
  ],
});

const initialThemeMode = loadFromLocalStorage('themeMode') || 'light';

export const themeModeState = atom({
  key: 'themeModeState',
  default: initialThemeMode,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage('themeMode', newValue);
        document.body.className = newValue; // Apply the theme to the body class
      });
    },
  ],
});
