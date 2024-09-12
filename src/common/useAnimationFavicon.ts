let animationRunning: any = true
const iconFavicon = "../assets/icons/favicon-128.png"

export const useAnimationFavicon = () => {
  const scaleImageData = (): void => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (context) {
      const image = new Image()
      image.src = iconFavicon // Đặt lại icon size phù hợp
      image.onload = () => {
        canvas.width = 128
        canvas.height = 128

        const animateScale = (scale: number): void => {
          if (!animationRunning) {
            return
          }

          context.clearRect(0, 0, canvas.width, canvas.height)
          context.save()
          context.translate(canvas.width / 2, canvas.height / 2) // Di chuyển tới trung tâm của canvas
          context.scale(scale, scale)
          context.drawImage(
            image,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
          ) // Vẽ ảnh từ trung tâm của canvas
          context.restore()
          if (typeof browser !== "undefined") {
            browser.action.setIcon({
              imageData: context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              ) as any
            })
          } else {
            chrome.action.setIcon({
              imageData: context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              ) as any
            })
          }
          window.setTimeout(() => {
            const nextScale = scale >= 1 ? 0.5 : scale + 0.1 // Nếu đã đạt scale = 1, quay lại scale = 0
            animateScale(nextScale)
          }, 100) // Thời gian delay giữa các frame
        }

        animateScale(0.5) // Bắt đầu animation với scale ban đầu là 0
      }
    }
  }

  const stopAnimation = (): void => {
    animationRunning = false
    if (typeof browser !== "undefined") {
      browser.action.setIcon({
        path: iconFavicon
      })
    } else {
      chrome.action.setIcon({
        path: iconFavicon
      })
    }
  }

  return {
    stopAnimation,
    scaleImageData
  }
}
