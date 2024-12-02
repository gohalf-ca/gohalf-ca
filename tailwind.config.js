/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx}",
    ],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                "black-100": "#0A0A0E",
                "white-100": "#F0F0F0",
                background: "#0a0a0b",
                foreground: "#FAFAFA",
            },
            width: {
                '20w': '450px'
            },
            height: {
                '20h': '50px'
            }

        },
        // screens: {
        //     xs: "450px",
        // },
    },
    plugins: [],
}

