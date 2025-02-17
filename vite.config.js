import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&display=swap');
        $primaryFont: "IBM Plex Sans", sans-serif;
        $secondaryFont: "Edu AU VIC WA NT Hand", cursive;
        $primaryColor: #0167B1;
        $lightPrimaryColor: #01AEF2;
        $secondaryColor: #FFDA74;
        $darkSecondaryColor: #A48B47;
        $white: #ffffff;
        $black: #000000;
        $grey: #97989A;
        $darkGrey: #3d3d3d;
        $red: #d61d16;
        $darkRed: #8a130f;
        $boxShadow: 5px 7px 9px 2px;
        $secondaryBoxShadow: 6px 11px 20px 1px;
        `,
      },
    },
  },
});
