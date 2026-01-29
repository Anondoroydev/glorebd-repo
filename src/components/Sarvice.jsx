import sOne from "../assets/SOne.png";
import sThree from "../assets/SThree.webp";
import sTwo from "../assets/STwo.webp";

const Sarvice = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="mt-12 mb-12 flex flex-wrap justify-around">
        {/* Service 1 */}
        <div className="w-full md:w-1/3 flex flex-col items-center px-4 mb-8 md:mb-0">
          <div className="w-[100px] h-[100px] mb-4">
            <img
              src={sOne}
              alt="Service 1"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[20px] font-bold hover:text-pink-600 text-center">
            Easy Exchange Policy
          </p>
          <p className="text-[20px] hover:text-pink-600 text-center">
            We Offer hassle free exchange policy
          </p>
        </div>

        {/* Service 2 */}
        <div className="w-full md:w-1/3 flex flex-col items-center px-4 mb-8 md:mb-0">
          <div className="w-[100px] h-[100px] mb-4">
            <img
              src={sTwo}
              alt="Service 2"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[20px] font-bold hover:text-pink-600 text-center">
            3 Days Return Policy
          </p>
          <p className="text-[20px] hover:text-pink-600 text-center">
            We provide 3 days free return policy
          </p>
        </div>

        {/* Service 3 */}
        <div className="w-full md:w-1/3 flex flex-col items-center px-4">
          <div className="w-[100px] h-[100px] mb-4">
            <img
              src={sThree}
              alt="Service 3"
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-[20px] font-bold hover:text-pink-600 text-center">
            Best customer support
          </p>
          <p className="text-[20px] hover:text-pink-600 text-center">
            We provide 24/7 customer support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sarvice;
