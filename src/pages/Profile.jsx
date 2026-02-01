import React, { useState, useEffect } from 'react';
import SEO from '../components/shared/SEO';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';
import LoadingScreen from '../components/shared/LoadingSpinner';
import ProfileHeader from '../components/profile/ProfileHeader';
import AvatarCard from '../components/profile/AvatarCard';
import ProfileDetailsForm from '../components/profile/ProfileDetailsForm';
import SecurityCard from '../components/profile/SecurityCard';

const Profile = () => {
    const { user, refreshUser } = useAuth();
    const [updating, setUpdating] = useState(false);
    
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        avatar_url: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.user_metadata?.full_name || '',
                email: user.email || '',
                avatar_url: user.user_metadata?.avatar_url || ''
            });
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: formData.full_name }
            });

            if (error) throw error;
            
            toast.success('Profile updated successfully');
            if (refreshUser) await refreshUser();
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    if (!user) return <LoadingScreen message="Loading profile..." />;

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 relative">
            <SEO 
                title="Your Profile" 
                description="Update your Reelspot profile details and account security settings."
            />
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                
                <ProfileHeader />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <AvatarCard 
                            fullName={formData.full_name}
                            email={formData.email}
                            avatarUrl={formData.avatar_url}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <ProfileDetailsForm 
                            fullName={formData.full_name}
                            email={formData.email}
                            setFullName={(val) => setFormData({...formData, full_name: val})}
                            onSave={handleUpdateProfile}
                            updating={updating}
                        />
                    </div>
                </div>

                <SecurityCard />
            </div>
        </div>
    );
};

export default Profile;
