$(document).ready(function() {
    const openButton = document.querySelector("[data-open-modal]")
    const closeButton = document.querySelector("[data-close-modal]")
    const modal = document.querySelector("[data-modal]")
    let galleryImages = $(".gallery__image")

    openButton.addEventListener("click", () => {
        modal.showModal()
    })

    closeButton.addEventListener("click", () => {
        modal.close()
    })

    $('.gallery__arrow--right').on("click", function () {
        let stepValue = 1
        changeGalleryImage(stepValue)
    })

    $('.gallery__arrow--left').on("click", function () {
        let stepValue = -1
        changeGalleryImage(stepValue)
    })

    function changeGalleryImage(stepValue) {
        let currentImg = $(".gallery__image").not(".gallery__image--hidden")
        let currentImgIdx = currentImg.index()
        let followingImgIdx = currentImgIdx + stepValue
        let followingImg = galleryImages.eq(followingImgIdx)
        if (followingImgIdx > galleryImages.length - 1) {
            followingImg = galleryImages.first()
        } else if (followingImgIdx < 0) {
            followingImg = galleryImages.last()
        }
        currentImg.addClass("gallery__image--hidden")
        followingImg.removeClass("gallery__image--hidden")
    }

    // const galleryImageDimensions = galleryImage.getBoundingClientRect()
    // if (
    //     (e.clientX < galleryImageDimensions.left ||
    //     e.clientX > galleryImageDimensions.right ||
    //     e.clientY < galleryImageDimensions.top ||
    //     e.clientY > galleryImageDimensions.bottom) &&
    //     arrowClicked === false
    // ) {
    //     modal.close()
    // }
});