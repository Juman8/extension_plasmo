let isCheckFirstLogin = false

export const setStatusOFLogin = (): void => {
  isCheckFirstLogin = true
}
export const onReloadUrl = (url: string): void => {
  if (typeof browser !== "undefined") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        const currentTab = tabs[0]
        const newUrl = url // URL mới bạn muốn gán
        // Cập nhật URL của tab hiện tại
        browser.tabs.update(currentTab.id, { url: newUrl }).then(() => {
          // Sau khi cập nhật URL thành công, làm mới tab
          setTimeout(() => {
            onHideExtension()
          }, 599)
        })
      }
    })
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        const currentTab = tabs[0]
        const newUrl = url // URL mới bạn muốn gán
        // Cập nhật URL của tab hiện tại
        chrome.tabs.update(currentTab.id, { url: newUrl }).then(() => {
          // Sau khi cập nhật URL thành công, làm mới tab
          setTimeout(() => {
            onHideExtension()
          }, 599)
        })
      }
    })
  }
}

export const onOpenNewTab = (url: string): void => {
  window.open(url)
}

export const onHideExtension = (): void => {
  if (typeof browser !== "undefined") {
    browser.runtime.reload() // Dành cho Firefox
  } else {
    chrome.runtime.reload()
  }
}
