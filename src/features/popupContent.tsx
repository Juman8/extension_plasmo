import React, {useEffect} from 'react';

import "~style.scss"

import FormLogin from '~features/Login/FormLogin';
import {ScrapperScreen} from '~features/ScrapperScreen/ScrapperScreen';
import {storage} from '~utils';
import {KEY_USER_TOKEN} from '~common/constant';
import {getProfile} from '~api/authApi';
import {setToken} from '~api/common';
import UserContext from '~UserContext';

function IndexPopup() {
  const {dataUser, setUserData} = React.useContext(UserContext) as any;
  const [isLoading, setIsLoading] = React.useState(true);

  const dataSyncs = async () => { 
    const token = await storage.getItem(KEY_USER_TOKEN);// { color: "red" }
    if(token){
      setToken(token)
      const status = await getProfile();
      if (!status) {
        setUserData('');
        setToken('')
        storage.removeItem(KEY_USER_TOKEN);
      } else {
        setUserData(token)
      }
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    dataSyncs();
  }, [])

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-p-4">
      {!dataUser ? (
        <section id="popup">
          <FormLogin isLoading={isLoading} /> 
        </section>
      ) : (
        <ScrapperScreen />
      )}
    </div>
  )
}

export default IndexPopup
