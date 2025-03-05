"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Plane, 
  Utensils, 
  Gift, 
  Plus, 
  Pencil, 
  Trash2, 
  Search 
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';

// Custom event for transaction updates
const dispatchTransactionUpdate = () => {
  // Dispatch event to notify components about transaction changes
  window.dispatchEvent(new Event('transactionUpdate'));
  // Also trigger storage event for components that listen to localStorage changes
  window.dispatchEvent(new Event('storage'));
};

// Transaction interface
interface Transaction {
  id: string;
  category: string;
  date: string;
  amount: number;
  description: string;
  icon?: React.ReactNode;
}

// Categories with their respective icons
const categories = [
  { name: 'Shopping', icon: <ShoppingBag size={16} /> },
  { name: 'Food', icon: <Utensils size={16} /> },
  { name: 'Coffee', icon: <Coffee size={16} /> },
  { name: 'Housing', icon: <Home size={16} /> },
  { name: 'Transport', icon: <Car size={16} /> },
  { name: 'Travel', icon: <Plane size={16} /> },
  { name: 'Gift', icon: <Gift size={16} /> },
];

// Function to get icon by category name
const getIconByCategory = (categoryName: string) => {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.icon : <ShoppingBag size={16} />;
};

// Format date from YYYY-MM-DD to "Nov 17" format
const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};

const TransactionsPage: React.FC = () => {
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State for form
  const [formData, setFormData] = useState<Omit<Transaction, 'id' | 'icon'>>({
    category: 'Shopping',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
  });
  // State for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  // State for current transaction ID being edited
  const [currentTransactionId, setCurrentTransactionId] = useState<string | null>(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Sample data if no transactions exist
      const sampleTransactions: Transaction[] = [
        { id: '1', category: 'Shopping', date: '2025-03-17', amount: 49.99, description: 'Clothing', icon: <ShoppingBag size={16} /> },
        { id: '2', category: 'Food', date: '2025-03-16', amount: 39.99, description: 'Groceries', icon: <Utensils size={16} /> },
        { id: '3', category: 'Shopping', date: '2025-03-15', amount: 99.99, description: 'Electronics', icon: <ShoppingBag size={16} /> },
        { id: '4', category: 'Coffee', date: '2025-03-14', amount: 29.99, description: 'Coffee shop', icon: <Coffee size={16} /> },
        { id: '5', category: 'Travel', date: '2025-03-13', amount: 59.99, description: 'Bus tickets', icon: <Plane size={16} /> },
      ];
      setTransactions(sampleTransactions);
      localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
    }
  }, []);
  
  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    dispatchTransactionUpdate();
  }, [transactions]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? (value === '' ? 0 : parseFloat(value)) : value,
    });
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode && currentTransactionId) {
      // Update existing transaction
      const updatedTransactions = transactions.map(transaction => 
        transaction.id === currentTransactionId ? 
        { 
          ...transaction, 
          category: formData.category, 
          date: formData.date, 
          amount: formData.amount || 0, // Ensure amount is never NaN
          description: formData.description,
          icon: getIconByCategory(formData.category)
        } : transaction
      );
      
      setTransactions(updatedTransactions);
      toast.success('Transaction updated successfully');
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        category: formData.category,
        date: formData.date,
        amount: formData.amount || 0, // Ensure amount is never NaN
        description: formData.description,
        icon: getIconByCategory(formData.category),
      };
      
      setTransactions([newTransaction, ...transactions]);
      toast.success('Transaction added successfully');
    }
    
    // Reset form and close dialog
    resetForm();
    setIsDialogOpen(false);
  };
  
  // Handle editing a transaction
  const handleEdit = (transaction: Transaction) => {
    setFormData({
      category: transaction.category,
      date: transaction.date,
      amount: transaction.amount || 0, // Ensure amount is never NaN
      description: transaction.description,
    });
    setCurrentTransactionId(transaction.id);
    setEditMode(true);
    setIsDialogOpen(true);
  };
  
  // Handle deleting a transaction
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
      toast.success('Transaction deleted successfully');
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      category: 'Shopping',
      date: new Date().toISOString().split('T')[0],
      amount: 0, // Initialize with 0, not undefined or NaN
      description: '',
    });
    setEditMode(false);
    setCurrentTransactionId(null);
  };
  
  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.date.includes(searchQuery) ||
    transaction.amount.toString().includes(searchQuery)
  );
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editMode ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
                <DialogDescription>
                  {editMode ? 'Update transaction details below.' : 'Fill in the details for your new transaction.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.name} value={cat.name}>
                            <div className="flex items-center">
                              <span className="mr-2">{cat.icon}</span>
                              <span>{cat.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount.toString()} // Convert to string to avoid NaN error
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">
                    {editMode ? 'Update Transaction' : 'Add Transaction'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                          {getIconByCategory(transaction.category)}
                        </div>
                        {transaction.category}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{formatDateForDisplay(transaction.date)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount || 0)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(transaction)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(transaction.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      No transactions found. Add a new transaction to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;