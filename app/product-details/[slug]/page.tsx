'use client'

import { useState } from 'react';
import { 
  HiOutlineChevronRight, 
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineQuestionMarkCircle,
  HiOutlineStar,
  HiOutlineChatAlt2
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import AskQuestionModal from '@/modules/components/modal/AskQuestion';
import { ProductCard } from '@/modules/components/common/ProductCard';
import Link from 'next/link';

const product = {
  id: 3,
  brand: 'Elevates Clothing',
  name: 'Stay Wild Stay Free Wolf Graphic T-Shirt',
  images: [
    'https://placehold.co/600x600/7c9a7d/white?text=Main+Image',
    'https://placehold.co/600x600/7c9a7d/white?text=Front+View',
    'https://placehold.co/600x600/7c9a7d/white?text=Back+View',
    'https://placehold.co/600x600/7c9a7d/white?text=Detail+View',
  ],
  salePrice: 299.00,
  originalPrice: 599.00,
  details: [
    { label: 'Weight', value: '175' },
    { label: 'Material', value: 'cotton' },
    { label: 'Fit', value: 'regular' },
    { label: 'Pattern', value: 'typography-print' },
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Sage Green', hex: '#7c9a7d' },
    { name: 'Black', hex: '#2b2b2b' },
    { name: 'Maroon', hex: '#8c3a52' },
  ],
  description: "Embrace your wild spirit with this nature-inspired t-shirt featuring a detailed wolf illustration in earthy tones. The design includes inspiring 'STAY WILD' text in a bold, rustic font, set against a soothing sage green background, with 'STAY FREE' prominently displayed at the bottom. The wolf's pensive gaze and realistic rendering capture the essence of freedom and untamed spirit. Perfect for nature lovers, adventure seekers, and those who refuse to be confined by convention.",
  specifications: [
    { label: 'Fabric', value: '100% Premium Cotton (180 GSM)' },
    { label: 'Fit Type', value: 'Regular Fit, Standard Length' },
    { label: 'Print', value: 'High-density digital print' },
    { label: 'Care', value: 'Machine wash cold, tumble dry low' },
  ]
};

const relatedProducts = [
  { id: 1, name: 'Legendary Dragon Graphic T-Shirt - Black', imageUrl: 'https://placehold.co/500x500/333333/white?text=Product+1', salePrice: 299.00, originalPrice: 599.00, currency: '₹' },
  { id: 2, name: 'Vintage Typography Floral T-Shirt', imageUrl: 'https://placehold.co/500x500/8c3a52/white?text=Product+2', salePrice: 299.00, originalPrice: 599.00, currency: '₹' },
  { id: 3, name: 'Stay Wild Stay Free Wolf Graphic T-Shirt', imageUrl: 'https://placehold.co/500x500/7c9a7d/white?text=Product+3', salePrice: 299.00, originalPrice: 599.00, currency: '₹' },
  { id: 4, name: 'Unlimited Potential Typography T-Shirt', imageUrl: 'https://placehold.co/500x500/2b2b2b/white?text=Product+4', salePrice: 299.00, originalPrice: 599.00, currency: '₹' },
];

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]); // Default to 'M'
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default to first color
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Quantity handlers
  const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, 10)); // Max 10
  const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));  // Min 1

  // Action handlers
  const handleAddToCart = () => {
    console.log({
      productId: product.id,
      size: selectedSize,
      color: selectedColor.name,
      quantity: quantity,
    });
    alert('Added to cart!');
  };
  
  const handleBuyNow = () => {
    console.log('Redirecting to checkout...');
    alert('Redirecting to checkout!');
  };

  const handleOpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const handleSubmitQuestion = (question) => {
    const toastId = toast.loading('Submitting your question...');
    
    // --- Simulate API call ---
    setTimeout(() => {
      // Simulate a random success/failure
      if (Math.random() > 0.2) { // 80% success chance
        toast.success('Question submitted successfully! It will be reviewed shortly.', { id: toastId });
        console.log('Submitted Question:', question);
      } else {
        toast.error('Failed to submit question. Please try again.', { id: toastId });
      }
      handleCloseQuestionModal(); // Close modal on success or failure
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
            <li><HiOutlineChevronRight className="h-4 w-4" /></li>
            <li><span className="font-medium text-gray-700">Product Details</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* 1. Product Gallery (Left) */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="w-16 shrink-0 flex flex-col gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-orange-500' : 'border-transparent'} transition-all`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 2. Product Info (Right) */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-sm font-medium text-gray-500 uppercase">{product.brand}</h2>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.salePrice.toFixed(2)}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</span>
            </div>

            {/* Info Links */}
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-orange-500">
                <HiOutlineStar className="inline h-4 w-4 mr-1" />
                Size Chart
              </a>
              <a href="#" className="hover:text-orange-500">
                <HiOutlineClock className="inline h-4 w-4 mr-1" />
                Delivery & return
              </a>
              <a href="#" className="hover:text-orange-500">
                <HiOutlineQuestionMarkCircle className="inline h-4 w-4 mr-1" />
                Ask a Question
              </a>
            </div>

            {/* Details List */}
            <ul className="space-y-1 text-sm text-gray-700">
              {product.details.map((detail) => (
                <li key={detail.label}>
                  <span className="font-semibold">{detail.label}:</span> {detail.value}
                </li>
              ))}
            </ul>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size: <span className="font-bold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: <span className="font-bold">{selectedColor.name}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border border-gray-300 transition-all ${
                      selectedColor.hex === color.hex
                        ? 'ring-2 ring-orange-500 ring-offset-1'
                        : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-l-md"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-5 py-2 text-base font-semibold border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-r-md"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-orange-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-orange-600 transition-colors"
              >
                <HiOutlineShoppingCart className="h-5 w-5 mr-2" />
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-800 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-800 hover:text-white transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        <div className="mt-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specification')}
                className={`py-4 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'specification'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specification
              </button>
              <button
                  onClick={() => setActiveTab('qna')}
                  className={`py-4 px-1 border-b-2 text-sm font-medium ${
                    activeTab === 'qna'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Q & A
                </button>

                {/* Reviews Tab (NEW) */}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specification' && (
              <ul className="space-y-2 text-sm text-gray-600">
                {product.specifications.map((spec) => (
                  <li key={spec.label} className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-800">{spec.label}</span>
                    <span className="col-span-2">{spec.value}</span>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'qna' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Have Doubts Regarding This Product?
                    </h3>
                    <button
                      onClick={handleOpenQuestionModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      Post Your Question
                    </button>
                  </div>
                  
                  {/* Placeholder for when no questions exist */}
                  <div className="text-center text-gray-500 py-8">
                    <HiOutlineChatAlt2 className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm">No questions yet. Be the first to ask!</p>
                  </div>

                  {/* You would map over and display existing questions here */}
                </div>
              )}

              {/* Reviews Content (NEW) */}
              {activeTab === 'reviews' && (
                <div className="text-center text-gray-500 py-8">
                  {/* Placeholder for reviews */}
                  <p>No reviews yet for this product.</p>
                </div>
              )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Related Products
            </h2>
            <div className="w-20 h-1 bg-orange-500 mt-2 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>

      <AskQuestionModal 
        isOpen={isQuestionModalOpen}
        onClose={handleCloseQuestionModal}
        onSubmit={handleSubmitQuestion}
        product={product}
      />
    </div>
  );
};

export default ProductDetailPage;