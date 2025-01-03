import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // Get the i18n instance here

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // This should work if i18n is set up correctly
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <br/>

      <button onClick={() => changeLanguage('fr')}>Français</button>
      <br/>
      <button onClick={() => changeLanguage('es')}>spanich</button>
    </div>
  );
};

export default LanguageSwitcher;
