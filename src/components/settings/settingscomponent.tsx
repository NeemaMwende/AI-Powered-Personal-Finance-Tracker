import { FC, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Shield, CreditCard } from 'lucide-react';

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  email: {
    primary: string;
    secondary?: string;
  };
  phone: {
    primary: string;
    secondary?: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  timezone: string;
  nationality: string;
  merchantId?: string;
  nationalId?: string;
}

const SettingsPage: FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Gordon Hampton',
    role: 'Designer',
    avatar: '',
    email: {
      primary: 'gordon.hampton@example.com',
      secondary: 'ghampton@work.com'
    },
    phone: {
      primary: '07** ***778',
      secondary: '07** ***741'
    },
    address: {
      street: 'Main Street',
      city: 'London',
      zipCode: '00618',
      country: 'United Kingdom'
    },
    timezone: '(GMT-08:00) Pacific Time (Los Angeles)',
    nationality: 'United Kingdom',
    merchantId: 'MERCH8D6239N5N',
    nationalId: '3****297'
  });

  const [isEditing, setIsEditing] = useState({
    profile: false,
    email: false,
    phone: false,
    address: false
  });

  const handleProfileUpdate = () => {
    // Here you would typically send the data to your API
    console.log('Updating profile with:', profile);
    setIsEditing({...isEditing, profile: false});
    // Add toasts or notifications here to indicate success
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                    <Avatar className="w-24 h-24">
                      {profile.avatar ? (
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                      ) : (
                        <AvatarFallback className="text-lg">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex flex-col gap-2 items-center sm:items-start">
                      {isEditing.profile ? (
                        <>
                          <Label htmlFor="name">Name</Label>
                          <Input 
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="w-full"
                          />
                          <Label htmlFor="role" className="mt-2">Role</Label>
                          <Input 
                            id="role"
                            value={profile.role}
                            onChange={(e) => setProfile({...profile, role: e.target.value})}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold">{profile.name}</h3>
                          <p className="text-gray-500">{profile.role}</p>
                        </>
                      )}
                      
                      <div className="mt-2">
                        {isEditing.profile ? (
                          <div className="flex gap-2 mt-4">
                            <Button onClick={handleProfileUpdate}>Save</Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsEditing({...isEditing, profile: false})}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => setIsEditing({...isEditing, profile: true})}
                          >
                            Change Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="timezone">Time zone</Label>
                          <Select 
                            defaultValue={profile.timezone}
                            onValueChange={(value) => setProfile({...profile, timezone: value})}
                          >
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="(GMT-08:00) Pacific Time (Los Angeles)">
                                (GMT-08:00) Pacific Time
                              </SelectItem>
                              <SelectItem value="(GMT-05:00) Eastern Time (New York)">
                                (GMT-05:00) Eastern Time
                              </SelectItem>
                              <SelectItem value="(GMT+00:00) Greenwich Mean Time">
                                (GMT+00:00) Greenwich Mean Time
                              </SelectItem>
                              <SelectItem value="(GMT+01:00) Central European Time">
                                (GMT+01:00) Central European Time
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="nationality">Nationality</Label>
                          <Select 
                            defaultValue={profile.nationality}
                            onValueChange={(value) => setProfile({...profile, nationality: value})}
                          >
                            <SelectTrigger id="nationality">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Kenya">Kenya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {profile.merchantId && (
                        <div>
                          <Label>Merchant ID</Label>
                          <p className="text-gray-500">{profile.merchantId}</p>
                        </div>
                      )}
                      
                      {profile.nationalId && (
                        <div className="flex justify-between items-center">
                          <div>
                            <Label>National ID</Label>
                            <p className="text-gray-500">{profile.nationalId}</p>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <CardTitle>Emails</CardTitle>
                    </div>
                    <Button size="sm">Add</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Primary</span>
                          <p>{profile.email.primary}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    
                    {profile.email.secondary && (
                      <div className="flex justify-between items-center">
                        <p>{profile.email.secondary}</p>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <CardTitle>Phone numbers</CardTitle>
                    </div>
                    <Button size="sm">Add</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Primary</span>
                          <p>{profile.phone.primary}</p>
                        </div>
                        <p className="text-xs text-gray-500">Mobile</p>
                      </div>
                      <Button variant="ghost" size="sm">Change</Button>
                    </div>
                    
                    {profile.phone.secondary && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p>{profile.phone.secondary}</p>
                          <p className="text-xs text-gray-500">Mobile</p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <CardTitle>Addresses</CardTitle>
                    </div>
                    <Button size="sm">Add</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">Primary</span>
                        </div>
                        <p>{profile.address.street}</p>
                        <p>{profile.address.city}</p>
                        <p>{profile.address.zipCode}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          You are using this address for 2 cards
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-1 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-gray-500">Create or update your password.</p>
                      </div>
                    </div>
                    <Button>Update</Button>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-medium">Passkeys</h3>
                        <p className="text-sm text-gray-500">Seamlessly log in using your fingerprint, face, or PIN.</p>
                      </div>
                    </div>
                    <Button>Update</Button>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-medium">2-step verification</h3>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account by using a one-time security code in
                          addition to your password each time you log in.
                        </p>
                      </div>
                    </div>
                    <Button>Update</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-medium">Security questions</h3>
                        <p className="text-sm text-gray-500">
                          For your protection, please choose 2 security questions. This way, we can verify it is
                          really you if there is ever a doubt.
                        </p>
                      </div>
                    </div>
                    <Button>Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payments">
          <div className="grid gap-6 md:grid-cols-1 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
                <CardDescription>
                  Manage your automatic payments, choose a preferred way to pay, earn rewards, and do more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Online purchases</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Your preferred way to pay online</p>
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6" />
                        <div>
                          <p className="font-medium">Mastercard</p>
                          <p className="text-sm text-gray-500">Debit ****9362</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Automatic payments</h3>
                    <Button variant="outline" className="w-full justify-start">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div className="text-left">
                          <p>Automatic payments</p>
                          <p className="text-sm text-gray-500">View and update all your subscriptions and automatic payments.</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="grid gap-6 md:grid-cols-1 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Notification settings would go here */}
                  <p>Notification preferences coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Unlock new features like express checkout</p>
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Upgrade to a Business Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              Close your account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;