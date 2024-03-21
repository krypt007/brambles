import React from 'react';

const BillingInfo = ({ data }) => {
  return (
    <div className="max-w-md mx-auto p-4 border border-gray-800 rounded">
      <div className="flex mb-2 gap-2">
        <span className="block text-sm font-medium text-gray-700">Country:</span>
        <span className="block text-gray-500 text-sm">{data.country}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">First Name:</span>
        <span className="block text-gray-500 text-sm">{data.firstName}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Last Name:</span>
        <span className="block text-gray-500 text-sm">{data.lastName}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Address:</span>
        <span className="block text-gray-500 text-sm">{data.address1}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Postal Code:</span>
        <span className="block text-gray-500 text-sm">{data.postalCode}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Locality:</span>
        <span className="block text-gray-500 text-sm">{data.locality}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Administrative Area:</span>
        <span className="block text-gray-500 text-sm">{data.administrativeArea}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <span className="block text-sm font-medium text-gray-700">Email:</span>
        <span className="block text-gray-500 text-sm">{data.email}</span>
      </div>
    </div>
  );
};

export default BillingInfo;
