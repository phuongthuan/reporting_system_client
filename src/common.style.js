import { injectGlobal } from 'emotion';

injectGlobal`
  html {
    font-size: 100%;

    @media (min-width: 600px) {
      font-size: calc(112.5% + 4 * (100vw - 600px) / 400)
    }

    @media (min-width: 1024px) {
      font-size: calc(137.5%)
    }
  }

  body {
    font-family:"Hiragino Kaku Gothic ProN","Hiragino Kaku Gothic Pro","游ゴシック","YuGothic",Meiryo,メイリオ,"ＭＳ ゴシック",sans-serif;
    background-color: #FFFFFF;
  }

  *:focus {
    outline: none;
  }
`;
