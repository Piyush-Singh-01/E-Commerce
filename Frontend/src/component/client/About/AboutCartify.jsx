import {FiShoppingBag, FiTruck, FiShield, FiCheckCircle} from "react-icons/fi";

function AboutCartify() {
  return (
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left content */}
            <div>
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                    About Cartify
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    More than just an online store.
                </h2>

                <p className="mt-6 leading-7 text-gray-600">
                    Cartify is built with a simple idea — online shopping
                    should be convenient, reliable, and enjoyable.
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                    Our platform brings together a variety of products
                    while keeping the shopping experience clean and easy
                    to use. From discovering products to placing an
                    order, we want every step to feel effortless.
                </p>

                {/* Checklist */}
                <div className="mt-8 space-y-4">

                    <div className="flex items-start gap-3">
                        
                        <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-indigo-600" />

                        <p className="text-sm text-gray-600">
                            Carefully selected products
                        </p>

                    </div>

                    <div className="flex items-start gap-3">
                        <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-indigo-600" />
                        <p className="text-sm text-gray-600">
                            Simple and intuitive shopping experience
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-indigo-600" />
                        <p className="text-sm text-gray-600">
                            Secure and reliable checkout
                        </p>
                    </div>

                    <div className="flex items-start gap-3">

                        <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-indigo-600" />

                        <p className="text-sm text-gray-600">
                            Customer-focused service
                        </p>
                    
                    </div>
                
                </div>
            
            </div>

            {/* Right visual */}
            <div className="relative">
             
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-2xl">
                
                 <div className="rounded-[22px] bg-white p-8 sm:p-10">
                   
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl text-indigo-600">
                        <FiShoppingBag />
                    </div>

                    <h3 className="mt-8 text-2xl font-bold text-gray-900">
                        Everything you need,
                        <br />
                        in one place.
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                        Discover products, compare your choices,
                        add them to your cart, and enjoy a simple
                        shopping experience with Cartify.
                    </p>


                    <div className="mt-8 grid grid-cols-2 gap-4">

                        <div className="rounded-2xl bg-gray-50 p-5">
                            <FiTruck className="text-2xl text-indigo-600" />

                            <p className="mt-3 text-sm font-semibold text-gray-900">
                                Fast Delivery
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 p-5">
                            <FiShield className="text-2xl text-indigo-600" />

                            <p className="mt-3 text-sm font-semibold text-gray-900">
                                Secure
                            </p>
                       
                        </div>
    
                    </div>
                 
                  </div>
                
                </div>
           
            </div>
        
        </div>
  )
}

export default AboutCartify