import { ArrowRightIcon, CurrencyDollarIcon, UserGroupIcon, CalculatorIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { CardDescription, Card, CardTitle, CardHeader, CardContent } from "../components/ui/card"

export default function Home() {
    return (
        <>
            <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl text-black-100 dark:text-foreground font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Split Expenses, Stay Friends
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                GoHalf makes it easy to manage group expenses and split costs fairly. Perfect for trips, roommates, and more.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button variant="outline" asChild>
                                <Link to="/sign-up">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <h2 className="text-3xl font-bold text-black-100 dark:text-foreground tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
                <div role="list" className="px-4 grid text-black-100 dark:text-foreground grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                                Easy Expense Tracking
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Quickly add expenses and categorize them for better organization.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <UserGroupIcon className="h-6 w-6 mr-2" />
                                Group Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Create and manage multiple groups for different trips or shared living situations.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CalculatorIcon className="h-6 w-6 mr-2" />
                                Smart Splitting
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Automatically calculate fair splits based on expenses and contributions.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section >
            <section className="w-full py-12 md:py-24 lg:py-32 text-black-100 dark:text-foreground">
                <div className="px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Split Fairly?</h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Join GoHalf today and make group expense management a breeze.
                            </p>
                        </div>
                        <Button asChild>
                            <Link className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300" to="/sign-up">
                                Sign Up Now <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
