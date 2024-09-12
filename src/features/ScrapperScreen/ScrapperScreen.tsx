import * as React from "react"

import "./Scrapper.scss"

import {
  AddManyRecipeLineRequest,
  getToken,
  onCheckScrapperUrl,
  onCopyARecipe,
  onCreateARecipe,
  UpdateRecipeRequestV2
} from "~api/common"
import { configApi } from "~api/config"
import { onApiScrapUrl } from "~api/scraperApi"
import { useAnimationFavicon } from "~common/useAnimationFavicon"
import {
  changeArrayMethodToStringMethod,
  formatExtractLinev2,
  getNumberFromString
} from "~utils/common"

import { ContentBody } from "./components/ContentBody"
import { RecipeImage } from "./components/RecipeImage"
import { AddTagsInput } from "./components/TagsInput"
import { onOpenNewTab } from "./helper"

let isCopy = false

const initData = {
  type: "",
  value: ""
}

export const ScrapperScreen = (): any => {
  const [isErr, setErr] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentRecipeName, setCurrentRecipeName] = React.useState("")
  const [dataRecipe, setCurrentDataRecipe] = React.useState<any>()
  const [dataAlready, setDataAlready] = React.useState<any>()
  const [dataMessage, setDataMessage] = React.useState<any>({ ...initData })
  const [dataScrap, setDataScrap] = React.useState<any>()
  const { scaleImageData, stopAnimation } = useAnimationFavicon()

  const onShowMessAndHide = (
    recipeName: string,
    idRecipe: string,
    prefix: "saved!" | "is already saved!"
  ): void => {
    const text = ` ${prefix}`

    setDataMessage({
      type: "success",
      value: text,
      recipeName,
      urlCallback: `${configApi.domainWeb + idRecipe}?token=${getToken()}`
    })
    setTimeout(() => {
      setDataMessage({
        type: "isOpenLink",
        value: text,
        recipeName,
        urlCallback: `${configApi.domainWeb + idRecipe}?token=${getToken()}`
      })
    }, 2000)
  }

  const onShowErrorScrapper = (): void => {
    setDataMessage({
      type: "isAdd",
      value: "Sorry, we were unable to save that recipe.",
      recipeName: "",
      urlCallback: ``
    })
  }

  const onSyncDataRecipe = async (
    dataScrapper: any,
    recipeSource: string
  ): Promise<void> => {
    setDataScrap({ img: dataScrapper.image_source })
    const dataCheck = await onCheckScrapperUrl(recipeSource)
    stopAnimation()
    if (dataCheck?.isAlready) {
      setTimeout(() => {
        setDataAlready({
          ...dataCheck,
          name: dataScrapper.name
        })
        setIsLoading(false)
        setErr(false)
      }, 1000)
      return
    }
    const RecipeLineBody = formatExtractLinev2(dataScrapper.ingredients, 0)

    // Create recipe
    const dataNewRecipe = await onCreateARecipe()
    const idRecipe = dataNewRecipe?.data?.id
    if (idRecipe) {
      // update recipe
      const body = {
        name: dataScrapper.name,
        description: dataScrapper.description,
        portions: getNumberFromString(dataScrapper.portions) || 1,
        method: changeArrayMethodToStringMethod(dataScrapper.method),
        urlImage: dataScrapper.image_source,
        recipeSource,
        isScrapper: true
      }

      // update recipeline
      await AddManyRecipeLineRequest(idRecipe, { recipeLines: RecipeLineBody })
      // update info recipe
      await UpdateRecipeRequestV2(idRecipe, body)
      onShowMessAndHide(dataScrapper.name, idRecipe, "saved!")
      setCurrentDataRecipe(dataNewRecipe?.data)
      setIsLoading(false)
    } else {
      setErr(true)
    }
  }

  React.useEffect(() => {
    if (isErr) {
      onShowErrorScrapper()
    }
  }, [isErr])

  const callBackScrap = (data) => {
        if (data) {
          const currentTabSelected = data.find(
            (el: any) => el.active && el.selected
          )
          if (currentTabSelected && currentTabSelected.url) {
            onApiScrapUrl(currentTabSelected.url)
              .then((dataNew) => {
                setCurrentRecipeName(dataNew.name ?? "")
                if (dataNew?.supported) {
                  onSyncDataRecipe(dataNew, currentTabSelected.url || "")
                  setErr(false)
                } else {
                  setErr(true)
                  setIsLoading(false)
                  stopAnimation()
                }
              })
              .catch(() => {
                stopAnimation()
                setErr(true)
                setIsLoading(false)
              })
          } else {
            stopAnimation()
            setIsLoading(false)
          }
        }
      }

  const onClickScraper = (): void => {
    setErr(false)
    setIsLoading(true)
    if (typeof browser !== "undefined") {
      browser.tabs.query({ currentWindow: true, active: true }).then(callBackScrap)
    } else {
      chrome.tabs.query({ currentWindow: true, active: true }).then(callBackScrap)
    }
  }

  React.useEffect(() => {
    scaleImageData()
    onClickScraper()
  }, [])

  const onCopyRecipe = async () => {
    if (isCopy) {
      return
    }
    isCopy = true
    const dataCopy = await onCopyARecipe(dataAlready.idRecipe)
    isCopy = false
    setDataAlready(null)
    onShowMessAndHide(dataCopy.name, dataCopy.id, "saved!")
    setTimeout(() => {
      setCurrentDataRecipe(dataCopy)
    }, 2000)
  }

  return (
    <div style={{}} id="scapp">
      <div className="container">
        <div id="scappAnimatationText">
          {isLoading && !isErr && (
            <p
              style={{
                fontSize: 16
              }}>
              {currentRecipeName
                ? `Saving ${currentRecipeName} to MenuWise`
                : "Saving to MenuWise..."}
            </p>
          )}
          {dataAlready && (
            <div
              style={{
                justifyItems: "center"
              }}>
              <div
                style={{
                  justifyContent: "left",
                  fontSize: 16
                }}>
                <span
                  style={{ marginRight: 2 }}
                  className="plasmo-cursor-pointer"
                  onClick={() => {
                    const url = configApi.domainWeb + dataAlready?.idRecipe
                    onOpenNewTab(url)
                  }}>
                  <span
                    style={{
                      textDecorationLine: "underline",
                      marginRight: 2
                    }}>
                    {dataAlready?.name}
                  </span>
                  <span
                    style={{
                      textDecorationLine: undefined
                    }}>
                    is already saved.
                  </span>
                </span>
                <br />
                <p
                  className="plasmo-cursor-pointer"
                  onClick={() => onCopyRecipe()}
                  style={{
                    textDecorationLine: "underline",
                    marginTop: 2
                  }}>
                  Save another copy?
                </p>
              </div>
            </div>
          )}
          <ContentBody dataMessage={dataMessage} />
          <RecipeImage dataScrap={dataScrap} />
        </div>
        {!dataRecipe && (
          <AddTagsInput
            dataRecipe={{ ...(dataRecipe ?? {}), name: currentRecipeName }}
          />
        )}
      </div>
    </div>
  )
}
