import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const SettingsContext = createContext();


export const SettingsProvider = ({ children }) => {
  const [settingsForm, setSettingsForm] = useState({
    companyName : "",
    darkLogo : null,
    lightLogo : null,
    darkLogoPreview: null,
    lightLogoPreview: null,
    addressLine1 : "",
    addressLine2: "",
    phoneNumber : "",
    emailId : "",
    colorMode : "",
    header1 : "",
    subtitle1 : "",
    contactHeading  :"",
    contactPerson : "",
    pageheader1 : "",
    pageSubtitle1 : "",
    registerBtntxt : "",
    loginBtntxt : ""  
  });

  const axiosPrivate = useAxiosPrivate();


  const fetchSettingsData = async () => {
    try {
      // Fetch data from your API
      const response = await axiosPrivate.get(`/showallsiteSettings`, {
        // signal: controller.signal
      });
      const mappedData = {
        companyName: response.data.companyName || "",
        darkLogo: response.data.darkLogo || null,
        lightLogo: response.data.lightLogo || null,
        darkLogoPreview: response.data.darkLogo || null,
        lightLogoPreview: response.data.lightLogo || null,
        addressLine1: response.data.addressLine1 || "",
        addressLine2: response.data.addressLine2 || "",
        phoneNumber: response.data.phoneNumber || "",
        emailId: response.data.emailId || "",
        colorMode: response.data.colorMode || "",
        header1: response.data.header1 || "",
        subtitle1: response.data.subtitle1 || "",
        contactHeading: response.data.contactHeading || "",
        contactPerson: response.data.contactPerson || "",
        pageheader1: response.data.pageheader1 || "",
        pageSubtitle1: response.data.pageSubtitle1 || "",
        registerBtntxt: response.data.registerBtntxt || "",
        loginBtntxt: response.data.loginBtntxt || ""
      };
      setSettingsForm(mappedData);
    } catch (error) {
      console.error('Error fetching settings data:', error);
    }
  };

  useEffect(() => {
    // Fetch settings data when the component mounts
    fetchSettingsData();
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <SettingsContext.Provider value={{ settingsForm, fetchSettingsData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
