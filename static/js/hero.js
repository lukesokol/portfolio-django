$(document).ready(function(){
    const styles = getComputedStyle(document.documentElement);
    const heroMessageTop = $(".hero__message--top");
    const messageTitleTop = $(".message__title--top");
    const messageSubtitleTop = $(".message__subtitle--top");
    const profession = $(".hero__profession p");
    const messageTitleBottom = $(".message__title--bottom");
    const messageSubtitleBottom = $(".message__subtitle--bottom");

    let initialHeroParentSize = parseInt(styles.getPropertyValue('--hero-message-top--width'));
    let titleRatio = initialHeroParentSize / parseFloat(styles.getPropertyValue('--hero-message-title-top--font-size')) / 16;
    let subtitleRatio = initialHeroParentSize / parseFloat(styles.getPropertyValue('--hero-message-subtitle-top--font-size')) / 16;
    let professionRatio = initialHeroParentSize / parseFloat(styles.getPropertyValue('--hero-profession--font-size')) / 16;
    let messageTitleBottomRatio = initialHeroParentSize / parseFloat(styles.getPropertyValue('--hero-message-title-bottom--font-size')) / 16;
    let messageSubTitleBottomRatio = initialHeroParentSize / parseFloat(styles.getPropertyValue('--hero-message-subtitle-bottom--font-size')) / 16;
    
    let heroParentSize = heroMessageTop.width();
    if (heroParentSize !== initialHeroParentSize){
        messageTitleTop.css("fontSize", (heroParentSize / titleRatio) + "px");
        messageSubtitleTop.css("fontSize", (heroParentSize / subtitleRatio) + "px");
        profession.css("fontSize", (heroParentSize / professionRatio) + "px");
        messageTitleBottom.css("fontSize", (heroParentSize / messageTitleBottomRatio) + "px");
        messageSubtitleBottom.css("fontSize", (heroParentSize / messageSubTitleBottomRatio) + "px");
    }
    $(window).on('resize', function(){
        heroParentSize = heroMessageTop.width();
        if (heroParentSize !== initialHeroParentSize){
            messageTitleTop.css("fontSize", (heroParentSize / titleRatio) + "px");
            messageSubtitleTop.css("fontSize", (heroParentSize / subtitleRatio) + "px");
            profession.css("fontSize", (heroParentSize / professionRatio) + "px");
            messageTitleBottom.css("fontSize", (heroParentSize / messageTitleBottomRatio) + "px");
            messageSubtitleBottom.css("fontSize", (heroParentSize / messageSubTitleBottomRatio) + "px");
        }
    })
});