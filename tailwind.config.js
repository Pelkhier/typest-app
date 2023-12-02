/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                tomato: "#ff6347",
                tomatoSecondary: "#990000",
                gostwhite: "#f8f8ff",
                darkblue: "#1d212b",
                mygray: "#c2c9d6",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
