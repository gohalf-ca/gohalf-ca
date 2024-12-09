"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

export default function ThemeToggle() {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState(() => {
        // @info: this is a vite thingie. We can access the env to see if we're on the server.
        // if (import.meta.env.SSR) {
        //   return undefined
        // }
        if (typeof window === "undefined") {
            return undefined;
        }
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });
    const toggleTheme = () => {
        const t = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", t);
        setTheme(t);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.remove("dark");
            root.classList.add("light");
        } else {
            root.classList.add("dark");
            root.classList.remove("light");
        }
    }, [theme]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? (
        <>
            <Button
                variant="ghost"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent dark:text-accent-foreground hover:text-accent-foreground py-2 group/toggle h-8 w-8 px-0"
                onClick={toggleTheme}
            >
                <Sun className="hidden [html.dark_&]:block" />
                <Moon className="hidden [html.light_&]:block" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    ) : (
        <div />
    );
}
