import { useNavigate } from "react-router-dom";

import { FiShoppingBag, FiTruck, FiShield, FiHeart, FiUsers, FiArrowRight,FiHeadphones} from "react-icons/fi";

import AboutCartify from "../../../component/client/About/AboutCartify";

function About() {

    const navigate = useNavigate();

    const features = [
        {
            icon: <FiShoppingBag />,
            title: "Wide Product Selection",
            description:
                "Explore a wide range of products carefully selected to make your everyday shopping easier.",
        },
        {
            icon: <FiTruck />,
            title: "Fast & Reliable Delivery",
            description:
                "We focus on getting your orders to you quickly and safely, right at your doorstep.",
        },
        {
            icon: <FiShield />,
            title: "Secure Shopping",
            description:
                "Your security matters to us. Enjoy a safe and reliable shopping experience.",
        },
        {
            icon: <FiHeadphones />,
            title: "Customer Support",
            description:
                "Our support team is here to help you whenever you need assistance with your orders.",
        },
    ];

    const stats = [
        {
            number: "10+",
            label: "Happy Customers",
        },
        {
            number: "50+",
            label: "Products",
        },
        {
            number: "10+",
            label: "Orders Delivered",
        },
        {
            number: "99%",
            label: "Customer Satisfaction",
        },
    ];

    return (
        <main className="min-h-screen bg-white text-gray-900">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

                {/* Background decoration */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                    <div className="mx-auto max-w-3xl text-center">

                        {/* Small badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
                            <FiHeart className="text-indigo-500" />
                            Made for better shopping
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Shopping made{" "}
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                simple.
                            </span>

                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            Welcome to{" "}
                            <span className="font-semibold text-indigo-600">
                                Cartify
                            </span>
                            , your modern online shopping destination. We bring quality products, simple shopping, and a seamless experience together in one place.

                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <button
                                onClick={() => navigate("/product")}
                                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800 sm:w-auto"
                            >
                                Explore Products
                                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => navigate("/contact")}
                                className="w-full rounded-full border border-gray-200 cursor-pointer bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:w-auto"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/*  ABOUT CARTIFY */}
           <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <AboutCartify />

            </section>

            {/*  WHY CHOOSE US */}
            <section className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Why Cartify
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Why shop with us?
                        </h2>

                        <p className="mt-4 text-gray-600">
                            We focus on making every part of your shopping
                            journey simple and reliable.
                        </p>

                    </div>

                    {/* Feature cards */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                                    {feature.icon}
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-gray-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {feature.description}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="border-y border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center"
                            >
                                <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {stat.number}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {stat.label}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR MISSION */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

                <div className="overflow-hidden rounded-3xl bg-gray-900">

                    <div className="grid items-center lg:grid-cols-2">

                        {/* Text */}
                        <div className="p-8 sm:p-12 lg:p-16">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl text-white">
                                <FiUsers />
                            </div>

                            <p className="mt-8 text-sm font-bold uppercase tracking-widest text-indigo-300">
                                Our Mission
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Making online shopping better for everyone.
                            </h2>

                            <p className="mt-5 leading-7 text-gray-400">
                                Our mission is to create an online shopping
                                experience that puts customers first. We want
                                to make finding products, making decisions, and
                                completing purchases as simple as possible.
                            </p>

                        </div>

                        {/* Right side */}
                        <div className="relative hidden min-h-[360px] overflow-hidden lg:block">

                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90" />

                            <div className="absolute left-12 top-16 h-40 w-40 rounded-full bg-white/10 backdrop-blur-sm" />

                            <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-white/10 backdrop-blur-sm" />

                            <div className="absolute inset-0 flex items-center justify-center">

                                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 text-6xl text-white shadow-2xl backdrop-blur-md">
                                    <FiHeart />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 pb-20 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-14 text-center shadow-xl sm:px-12">

                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to start shopping?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                        Discover products you'll love and enjoy a simple,
                        modern shopping experience with Cartify.
                    </p>

                    <button
                        onClick={() => navigate("/product")}
                        className="group mt-8 inline-flex items-center cursor-pointer gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        Start Shopping
                        <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                </div>
            </section>
        </main>
    );
}

export default About;