function Banner() {
  return (
    <div className="max-w-[1520px] mx-auto py-10 px-4">
      <div className="w-full bg-pink-100 flex items-center justify-center rounded-3xl overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-12 py-10">

          {/* Left side: Text */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-snug">
              নতুন <br />
              <span className="text-pink-700">কালেকশন</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-800">
              ✨ <span className="font-semibold text-pink-600">GloreBD</span> - এর সাথে ফ্যাশনে পা রাখুন নতুন দিগন্তে! ❤️
            </p>
            <p className="text-lg sm:text-xl text-gray-800">
              আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ!
            </p>
            <p className="text-lg sm:text-xl text-gray-800">
              আপনার প্রিয় ফ্যাশন স্টাইল খুঁজে নিন আর নিজেকে সাজান অনন্যভাবে। ❤️
            </p>
            <button className="mt-4 bg-pink-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
              অর্ডার করুন
            </button>
          </div>

          {/* Right side: Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://glorebd.com/assets/hero-o4bu130g.webp"
              alt="Banner"
              className="w-full max-w-[500px] h-auto rounded-2xl object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Banner;
