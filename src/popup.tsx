import React from "react";
import IndexPopup from "~features/popupContent";
import MyContextProvider from "~theme/ThemeProvider";

function WrapPopUp() {
  return (
  <MyContextProvider>
    <IndexPopup />
  </MyContextProvider>
)
}
export default WrapPopUp
