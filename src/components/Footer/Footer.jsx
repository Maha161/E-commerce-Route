import img1 from "../../assets/images/amazon-pay.png"
import img2 from "../../assets/images/American-Express-Color.png"
import img3 from "../../assets/images/paypal.png"
import img4 from "../../assets/images/mastercard.webp"
import img5 from "../../assets/images/get-apple-store.png"
import img6 from "../../assets/images/get-google-play.png"
export default function Footer() {
  return <>
    <footer className="bg-gray-100 py-8">
      <div className="container">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Get the FreshCart App</h3>
          <p className="text-sm text-gray-600">
            We'll send you a link, open it on your phone to download the app
          </p>
          <div className="grid grid-cols-12 gap-2 mt-4">
           <input
              type="email"
              placeholder="Email Address"
             className="col-span-10 form-control"/>
            <button className="col-span-2 btn text-white text-sm bg-green-500 hover:bg-green-600">          
              SHARE APP LINK
            </button>
            </div>

        </div>

        <div className="flex flex-wrap justify-between items-center border-t border-gray-300 pt-6">
          <div className="mb-4 lg:mb-0 flex items-center">
            <p className="text-sm font-medium pe-2">Payment Partners</p>
            <div className="flex items-center mt-2 space-x-4">
              <img
                src={img1}
                alt="Amazon Pay"
                className="h-6"
              />
              <img
                src={img2}
                alt="American Express"
                className="h-6"
              />
              <img
                src={img3}
                alt="MasterCard"
                className="h-6"
              />
              <img src={img4} alt="PayPal" className="h-6" />
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-sm font-medium pe-2">Get deliveries with FreshCart</p>
            <div className="flex items-center mt-2 space-x-4">
              <img
                src={img5}
                alt="App Store"
                className="h-8"
              />
              <img
                src={img6}
                alt="Google Play"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>

  </>
}
