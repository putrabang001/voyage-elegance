'use client';

import { useState } from 'react';
import { Save, User, Lock, Globe, Mail } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'website', label: 'Website Settings', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account and website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-ocean-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" defaultValue="Admin" />
                    <Input label="Email" type="email" defaultValue="admin@voyageelegance.com" />
                    <Input label="Role" defaultValue="Superadmin" disabled />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button leftIcon={<Save className="w-4 h-4" />}>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button leftIcon={<Save className="w-4 h-4" />}>Update Password</Button>
                </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Website Information</h2>
                  <div className="space-y-4">
                    <Input label="Website Name" defaultValue="Voyage Elegance" />
                    <Input label="Tagline" defaultValue="Discover the Ocean's Finest Treasures" />
                    <Input label="Contact Email" type="email" defaultValue="hello@voyageelegance.com" />
                    <Input label="Contact Phone" defaultValue="+62 812 3456 7890" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button leftIcon={<Save className="w-4 h-4" />}>Save Settings</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
