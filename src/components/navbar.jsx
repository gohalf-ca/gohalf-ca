import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "../lib/utils"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import PropTypes from "prop-types";
import ThemeToggle from "../components/theme-toggle-button";
const location = useLocation();

export function Divider() {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
        </div>
    );
};

export function Logo({ className }) {
    return (
        <a href="/">
            <span className="sr-only">GoHalf</span>
            <h2
                className={cn(
                    " text-2xl font-semibold tracking-tighter lg:pl-0 text-black-100 dark:text-foreground/80",
                    className
                )}
            >
                <span className="text-indigo-600">Go</span>
                <span>Half</span>
            </h2>
        </a>
    )
}

Logo.propTypes = {
    className: PropTypes.string
}

// Gets trip_id from state mentioned at maintrips (trips list)
let trip_id =  location.state?.tri_id || null;



const authed_nav = [
    { name: "Trips", to: "/trips" },
    { name: "Expenses", to: `/expenses/${trip_id}` },
    { name: "Dashboard", to: "/dashboard" }
];

const navigation = [
    { name: "Home", to: "/" }
];

export function Navbar() {
    const { user, isSignedIn } = useUser();
    return (
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b">
            <Popover as="header" className="relative">
                <nav
                    className="relative flex items-center justify-between h-14"
                    aria-label="Global"
                >
                    <div className="flex flex-1 items-center">
                        <div className="flex w-full items-center justify-between md:w-auto">
                            <Logo className="mr-3 mb-1" />
                            <div className="-mr-2 flex items-center md:hidden gap-1">
                                <ThemeToggle />
                                <PopoverButton className="inline-flex justify-center rounded-md px-2 py-2 text-sm font-medium transition-all">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars2Icon
                                        strokeWidth={2}
                                        className="h-6 w-6 dark:text-foreground/80"
                                        aria-hidden="true"
                                    />
                                </PopoverButton>
                            </div>
                        </div>
                        {/*left menu items*/}
                        <div className="hidden -space-x-1 md:flex">
                        {(isSignedIn
                                //Checks if in trip-details, if yes returns everything + expenses, 
                                //if no returns everything without expenses
                            ? navigation.concat(authed_nav).filter((item) => {
                                if (location.pathname.startsWith("/trip-details")) {
                                    return item.name === "Expenses" || item.name !== "Expenses"; 
                                }
                                return item.name !== "Expenses";
                            })
                            : navigation
                        ).map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                className="px-3 text-sm font-medium text-black-100 dark:text-foreground"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    </div>
                    {/*right side desktop*/}
                    <div className="hidden transition-opacity md:flex md:items-center md:space-x-2">
                        <SignedIn>
                            {/*<Link to="/dashboard" className="px-3 py-2 text-base text-black-100 dark:text-foreground font-medium hover:rounded-md">Dashboard</Link>*/}
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Link
                                to="/sign-in"
                                className="rounded-xl border dark:border-foreground/80 dark:text-foreground/80 p-2 text-base font-semibold leading-none transition-all duration-300 hover:rounded-md"
                            >
                                Sign in
                            </Link>
                        </SignedOut>
                        <ThemeToggle />
                    </div>
                </nav>

                {/* popover data*/}
                <Transition
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <PopoverPanel
                        focus
                        className="absolute inset-x-0 top-0 z-10 origin-top scale-100 opacity-100 transition md:hidden bg-white dark:bg-background"
                    >
                        <div className="rounded-md border border-zinc-300 bg-custom-white shadow">
                            <div className="flex items-center justify-between px-5 pt-4">
                                <Logo />
                                <div className="-mr-2">
                                    <PopoverButton className="inline-flex items-center justify-center rounded-md bg-custom-white p-2 text-black-100 dark:text-foreground dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </PopoverButton>
                                </div>
                            </div>

                            <div className="pb-6 pt-5">
                                <div className="mb-2 flex flex-col space-y-1 px-2">
                                {(isSignedIn
                                    //Checks if in trip-details, if yes returns everything + expenses, 
                                    //if no returns everything without expenses
                                    ? navigation.concat(authed_nav).filter((item) => {      
                                        if (location.pathname.startsWith("/trip-details")) {
                                            return item.name === "Expenses" || item.name !== "Expenses"; 
                                        }
                                        return item.name !== "Expenses"; 
                                    })
                                    : navigation
                                ).map((item) =>
                                    item.name !== "Dashboard" ? (
                                        <Link
                                            key={item.name}
                                            to={item.to}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-black-100 dark:text-foreground/80 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : null
                                )}
                                </div>
                                <Divider />
                                <div className="mt-6 px-5 text-black-100 dark:text-foreground/80">
                                    <SignedIn>
                                        <div>
                                            <div className="flex flex-wrap items-end justify-between">
                                                <div className="inline-flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-base font-medium">
                                                            {user?.firstName}
                                                        </div>
                                                        <div className="text-sm font-medium">
                                                            {user?.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="/dashboard"
                                                    className="relative mt-4 rounded-md border border-gray-700 bg-custom-white px-4 py-2 text-base font-medium shadow-sm hover:rounded-md hover:bg-white hover:text-indigo-600"
                                                >
                                                    Dashboard
                                                </Link>
                                            </div>
                                        </div>
                                    </SignedIn>
                                    <SignedOut>
                                        <p className="text-center text-base font-medium text-black-100 dark:text-foreground/80">
                                            Existing customer?{" "}
                                            <Link
                                                to="/sign-in"
                                                className="text-base font-semibold text-indigo-600 transition-all duration-300 hover:rounded-md"
                                            >
                                                Sign in
                                            </Link>
                                        </p>
                                    </SignedOut>
                                </div>
                            </div>
                        </div>
                    </PopoverPanel>
                </Transition>
            </Popover>
        </header>
    )
}
