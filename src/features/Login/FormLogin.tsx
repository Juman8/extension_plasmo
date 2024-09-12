import React from 'react';
import {configApi} from '~api/config';
import {onOpenNewTab} from '~features/ScrapperScreen/helper';

export default function FormLogin({
  isLoading,
}: {
  isLoading: boolean;
}): JSX.Element {


  const onClick = async (type: string): Promise<void> => {
    const url = `${configApi.baseHostWeb}`;
    if (type === 'login') {
      onOpenNewTab(url);
    } else {
      onOpenNewTab(url);
    }
  };
  if (isLoading) {
    return (
      <div
        style={{
          height: 60,
        }}
      />
    );
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
          position: 'relative',
        }}
      >
      </div>
      <div className="pb-12">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Please
          <p
            onClick={() => {
              onClick('login');
            }}
            className="plasmo-cursor-pointer"
            style={{
              textDecorationLine: 'underline',
              marginLeft: 3,
              marginRight: 3,
            }}
          >
            log-in
          </p>
          or
          <p
            onClick={() => {
              onClick('register');
            }}
            className="plasmo-cursor-pointer"
            style={{
              textDecorationLine: 'underline',
              marginLeft: 3,
              marginRight: 3,
            }}
          >
            create an account
          </p>
        </div>
      </div>
    </>
  );
}
