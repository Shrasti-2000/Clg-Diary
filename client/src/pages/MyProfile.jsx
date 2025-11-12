import { Edit, Eye, Mail, MailIcon, MessageSquare, Package, Phone, PhoneCall, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addMessage, getMessages } from "../features/messages/messageSlice";
import { addProduct, editProduct, getProducts, updateProduct } from "../features/products/productSlice";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const {edit, allProducts, productLoading, productSuccess, productError, productErrorMessage} = useSelector(state => state.products);
  const { allMessages , messageSuccess , messageLoading, messageError , messageErrorMessage} = useSelector(state => state.message)
 

  const [formData, setFormData] = useState({
    title: "",
    isAvailable: true,
    price: "",
    itemImage: "",
    description: "",
  });

  const [myProducts, setMyProducts] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  // Destructure formdata
  const {title, isAvailable, price, itemImage, description } = formData;
 
   const dispatch = useDispatch();
  const navigate = useNavigate()

 // Update Product
  const handleSubmit = (e) => {
    if (edit.isEdit) {
      dispatch(updateProduct(formData));
     if(productSuccess){
         toast.success("Product Updated...", {position:"top-center"})
     }
    }
    // Add Product
    else{
           dispatch(addProduct(formData));
     if(productSuccess){
        dispatch(getProducts())
         toast.success("Product Add...", {position:"top-center"})
         navigate("/marketplace")
     }
    }
  };


// Use Effect 
   useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(getProducts());
    }

    setMyProducts(allProducts.filter((product) => {
    if (product.user.email === user.email) {
      return product;
    }
  }))

  

  // Send Message
  const sendAlert = (pid) => {
    dispatch(addMessage(pid))
  }    
  

 
  // console.log(myProducts)
 

  // fetch Messages
  dispatch(getMessages())

    if (productError && productErrorMessage || messageError && messageErrorMessage) {
      toast.error(productErrorMessage || messageErrorMessage);
    }

    // If edit mode is active, fill the form with that product's data
  if (edit.isEdit && edit.product) {

  setFormData({
    _id: edit.product._id,
    title: edit.product.title ,
    isAvailable: edit.product.isAvailable ?? true,
    price: edit.product.price,
    itemImage: edit.product.itemImage ,
    description: edit.product.description ,
  },[productError, productErrorMessage, edit, productSuccess, messageError, messageErrorMessage]);
}
else {
      // Reset form when not editing
      setFormData({title: "",
        isAvailable: true,
        price: "",
        itemImage: "",
        description: "",
      });
    }
  }, [
    dispatch,
    allProducts.length,
    productError,
    productErrorMessage,
    edit.product,
    edit.isEdit,
  ]);

  if (productLoading || messageLoading) {
    return <Loader />;
  }




  const scrole = () => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9A4EAE] via-[#9683EC] to-[#7851A9]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* My Details Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#683068] via-purple-500 to-[#8e4585] px-8 py-6">
              <h2 className="text-3xl font-bold text-white">My Details</h2>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-900 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-purple-600" />
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Name
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {user.name}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Email
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {user.email}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Phone
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      +91 {user.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Listing Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#683068] via-[#F19CBB] to-[#8e4585] px-8 py-6">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white">
                  Add New Listing
                </h2>
              </div>
            </div>
            <div className="p-8">
              <form onSubmit={handleSubmit}  className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                    required
                      value={title}
                      name="title"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter listing title"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Availablity
                    </label>
                    <select
                      defaultValue={isAvailable}
                    onChange={handleChange}
                      name="isAvailable"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option>Select category</option>
                      <option value={true}>Available</option>
                      <option value={false}>Unavailable</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      // type="number"
                      required
                      name="price"
                      value={price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                    required
                      type="text"
                      name="itemImage"
                      value={itemImage}
                      onChange={handleChange}
                      placeholder="Enter Image URL"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Describe your item or service"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#CF71AF] to-[#9F4576] hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* My Listings Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#683068] via-purple-500 to-[#8e4585] px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">My Listings</h2>
                </div>
                <span className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full">
                  {myProducts.length} Active
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Listing 1 */}
                {myProducts.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-transparent hover:border-pink-300 transition-all hover:shadow-lg"
                    >
                      <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                        {/* <Package className="w-16 h-16 text-purple-600" /> */}
                        <img
                          className="h-50 w-90 text-purple-600"
                          src={product.itemImage}
                          alt=""
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {product.title}
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {product.isAvailable ? "Active" : "InActive"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>
                        <p className="text-2xl font-bold text-purple-600 mb-4">
                          ₹{product.price}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Eye className="w-4 h-4" />
                          <span>145 views</span>
                        </div>
                        <div className="flex gap-2">
                         <div onClick={()=>scrole()} className="flex gap-2 w-full">
                           <button
                            onClick={() => dispatch(editProduct(product))}
                            className="flex-1 bg-[#A8516E] hover:bg-[#CF71AF] text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <Edit className="w-4 h-4" 
                            />
                            Edit
                          </button>
                         </div>
                          <button className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-semibold transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* My Messages Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#683068] via-[#F19CBB] to-[#8e4585] px-8 py-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white">My Messages</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {/*all Message 1 */}
              {
               allMessages.map((message) => {
                return (
                    <div key={message._id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#CF71AF] to-[#C9A0DC] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {message.user.name}
                        </h3>
                        <p className="text-sm text-gray-600">{new Date(message.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {message.listing.title}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                   {message.msg}
                  </p>
                   <a className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                  {message.user.phone}
                  </a>
                  <a className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                    <MailIcon className="w-4 h-4" />
                  {message.user.email}
                  </a>
                </div>
                )
               })
              }

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
