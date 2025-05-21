import { useState, useEffect } from 'react';
import { customersAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      setError('Failed to fetch customers');
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (customerId, isActive) => {
    try {
      await customersAPI.updateStatus(customerId, { isActive });
      toast.success('Customer status updated successfully');
      fetchCustomers();
    } catch (error) {
      toast.error('Failed to update customer status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Customers</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}`}
                        alt={customer.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">Joined {new Date(customer.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(customer)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleStatusChange(customer._id, !customer.isActive)}
                    className={`${
                      customer.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {customer.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Customer Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={selectedCustomer.avatar || `https://ui-avatars.com/api/?name=${selectedCustomer.name}`}
                    alt={selectedCustomer.name}
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedCustomer.name}</h4>
                    <p className="text-sm text-gray-500">Member since {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                  <p className="text-sm text-gray-900">Email: {selectedCustomer.email}</p>
                  <p className="text-sm text-gray-900">Phone: {selectedCustomer.phone || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-sm text-gray-900">{selectedCustomer.address?.street || 'N/A'}</p>
                  <p className="text-sm text-gray-900">
                    {selectedCustomer.address?.city || 'N/A'}, {selectedCustomer.address?.state || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-900">
                    {selectedCustomer.address?.country || 'N/A'}, {selectedCustomer.address?.zipCode || 'N/A'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Order History</h4>
                  <div className="mt-2 space-y-2">
                    {selectedCustomer.orders?.map((order, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>Order #{order._id.slice(-6)}</span>
                        <span>${order.totalAmount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers; 