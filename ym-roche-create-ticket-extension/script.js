function openPopUp() {
  document.getElementById('ymFrameHolder').style.display = 'block'
  document.getElementById('ymFrameHolder').style.opacity = 1
  document.getElementById('ymDivCircle').classList.add('open')
  document.getElementById('ym-notification').classList.add('ym-hidden')
}

iframe = document.getElementById('ymIframe')
if (iframe) {
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event_code: 'ym-client-event',
      data: JSON.stringify({
        event: {
          code: 'create-ticket',
          data: null
        }
      })
    }),
    null
  )

  if (document.getElementById('ymFrameHolder').style.display == 'none') {
    openPopUp()
    console.log('Chat window is not open')
  } else {
    console.log('Chat window is open')
  }
}