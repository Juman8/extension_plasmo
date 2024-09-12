import React from "react";

export const RecipeImage = (props: any) => {
  const {dataScrap} = props;
  if (!dataScrap) {
    return;
  }


  return (
    <div> 
      <img src={dataScrap.img} className="plasmo-max-h-[50px]" />
    </div>
  )

}