export const getCurrentChatId = () => {
    const hrefArray = location.href.split('/')
    if (hrefArray.length === 5){
        if (hrefArray[hrefArray.length - 2] === 'messages') {
            return hrefArray[hrefArray.length - 1]
        }
    }
}