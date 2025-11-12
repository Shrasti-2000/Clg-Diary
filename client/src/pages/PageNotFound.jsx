import { Home, Search, ArrowLeft } from 'lucide-react';


const PageNotFound = () => {
    return (
        <div className="min-h-screen p-12 bg-gradient-to-br from-[#9A4EAE] via-[#9683EC] to-[#7851A9] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-12 text-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 animate-pulse">
                                <span className="text-6xl font-bold text-white">404</span>
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                        </p>

                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
                            <div className="flex items-center justify-center gap-3 text-gray-700">
                                <Search className="w-6 h-6 text-purple-600" />
                                <p className="text-lg">
                                    Don't worry, you can find your way back home or explore our marketplace!
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-[#B284BE] via-[#9966CC] to-[#856088] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                                <Home className="w-5 h-5" />
                                Go to Home
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all border-2 border-purple-600 flex items-center justify-center gap-3">
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-gray-500">
                                Need help? Contact us at{' '}
                                <a href="mailto:support@eduverse.com" className="text-purple-600 font-semibold hover:text-purple-700">
                                    support@eduverse.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8 text-center">
                    <div className="inline-flex items-center  bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                        <div className="h-8 bg-white rounded-lg  flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">EV</span>
                        </div>
                        <span className="text-white font-semibold text-lg">EduVerse</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default PageNotFound