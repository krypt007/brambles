import React from 'react'

const Transactions = () => {
  return (
    <div className=''>
        <div className='flex justify-between w-full px-2 py-4 border-b border-gray-500 '>
            <div>
                Recent Transactions
            </div>
            <div>
                View All
            </div>
        </div>
        <table className='flex justify-between p-2 bg-gray-700 rounded-sm'>
            <th>Name</th><th>Email</th><th>Last Order</th><th>Method</th>
        </table>
        <div className='h-[60vh] overflow-scroll'>
            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Visa</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Visa</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Visa</td>
            </tr>

            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Mastercard</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>

            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>

            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-600 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
            <tr className='flex justify-between p-1 text-sm bg-gray-500 rounded-sm'>
                <td>John Smith</td><td>john@gmail.com</td><td>15minutes ago</td><td>Paypal</td>
            </tr>
        </div>
    </div>
  )
}

export default Transactions