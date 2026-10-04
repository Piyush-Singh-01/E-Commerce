import { useState } from "react";
import {FiMail, FiPhone, FiMapPin, FiClock, FiSend} from "react-icons/fi";
import useContact from "../../../hooks/useContact";
import { useNavigate } from "react-router-dom";

const inputCss = "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"

function Contact() {

    const navigate = useNavigate();

    const [data, setData] = useState({
         username: "",
         email: "",
         reason: "",
         message : "",
    });

    const {handleMessage, loading} = useContact();

    const handleInput = (e)=>{
          const {name, value} = e.target;

          setData((prev)=>({
              ...prev,
               [name]: value
          }));
    }

    const handleSubmit = async(e)=>{
      
        e.preventDefault();
        
       const response =  await handleMessage(data);

       console.log(response);

       if(response?.data?.success){
            setData({
                username: "",
                email: "",
                reason: "",
                message : "",
            });      
        }


    }
    return (
        <main className="min-h-screen bg-white text-gray-900">

            {/*  HERO  */}
            <section className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                            Contact Us
                        </span>

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                            We'd love to hear from you.
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            Have a question, need help with an order, or simply
                            want to get in touch? Our team is here to help.
                        </p>

                    </div>
                </div>
            </section>

            {/*  CONTACT CONTENT  */}
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

                    {/*  LEFT  */}
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Get in touch
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            How can we help?
                        </h2>

                        <p className="mt-5 max-w-md text-base leading-7 text-gray-500">
                            Whether you have a question about our products,
                            your order, or anything else, feel free to reach
                            out to us.
                        </p>

                        {/* Contact Information */}
                        <div className="mt-10 space-y-6">

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FiMail size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-950">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        support@cartify.com
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FiPhone size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-950">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        +91 9939606075
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FiMapPin size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-950">
                                        Address
                                    </p>

                                    <p className="mt-1 max-w-xs text-sm leading-6 text-gray-500">
                                        Maruti Kunj (Near BSF Camp)
                                        <br />
                                        Gurugram (Haryana) , India
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FiClock size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-950">
                                        Business Hours
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Monday – Friday, 9:00 AM – 6:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  CONTACT FORM  */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                       
                        <div>
                            <h2 className="text-2xl font-bold text-gray-950">
                                Send us a message
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Fill out the form below and we'll get back to
                                you as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {/* Name + Email */}
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                        Your Name
                                    </label>

                                    <input 
                                        id="name" 
                                        type="text"
                                        name="username" 
                                        value={data.username} 
                                        onChange={handleInput}
                                        required
                                        placeholder="Enter your name" 
                                        className={`${inputCss}`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        onChange={handleInput}
                                        value={data.email}
                                        placeholder="you@example.com"
                                        required
                                        className={`${inputCss}`}
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-semibold text-slate-900">
                                   Subject
                                </label>

                                <select id="subject" name="reason" value={data.reason} onChange={handleInput} required className={`cursor-pointer ${inputCss}`}>
                                    <option value="">Select a topic...</option>
                                    <option value="Order Tracking & Issues">Order Tracking & Issues</option>
                                    <option value="Returns & Refunds">Returns & Refunds</option>
                                    <option value="Product information">Product Information</option>
                                    <option value="Other Inquiry">Other Inquiry</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700" >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    onChange={handleInput}
                                    rows="6"
                                    placeholder="Write your message here..."
                                    className = {`resize-none ${inputCss}`}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-sm font-semibold text-white transition cursor-pointer"
                            >
                               {loading ? "Sending..." : "Send Message"}

                                <FiSend
                                    size={17}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />
                            </button>
                        </form>
                    </div>
                </div>

            </section>

            {/*  BOTTOM CTA  */}
            <section className="border-t border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">

                    <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
                        Looking for something to shop?
                    </h2>

                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                        Explore our collection and find something you'll love.
                    </p>

                    <button
                        onClick={()=> navigate('/product')}
                        type="button"
                        className="mt-6 rounded-xl cursor-pointer bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Explore Products
                    </button>

                </div>
            </section>
        </main>
    );
}

export default Contact;