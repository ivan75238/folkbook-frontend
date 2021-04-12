//https://colorscheme.ru/color-converter.html

//Настроки цветовых решений приложения

export const theme = {
    scroll: `
        /*Подробнее: 
        https://habr.com/ru/company/ruvds/blog/468405/
        https://codepen.io/zachleat/pen/WNezwqx
        http://htmlbook.ru/blog/polzovatelskie-skrollbary-v-webkit
        */
        overscroll-behavior: contain;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        scrollbar-width: thin;
        
        scrollbar-color: #687282 transparent; // scrollbar-color & scrollbar-track-color
        
        &::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
        
        ::-webkit-scrollbar-corner {
            background-color: transparent;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: #687282;
            border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: #d5d7da; //scrollbar-color-hover
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: #d5d7da; //scrollbar-color-active
        }
        &::-webkit-scrollbar-thumb:vertical {
            min-height: 8px;
        }
        &::-webkit-scrollbar-thumb:horizontal {
            min-width: 8px;
        } 
        `,
};
