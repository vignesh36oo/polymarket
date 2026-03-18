"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { updateUser } from "@/lib/redux/features/auth/authSlice";
import axios from "axios";

export default function ProfileSettings() {
  const { user } = useAppSelector((state) => state.auth);
  const token = user?.token;
  const dispatch = useAppDispatch();
  
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isError, setIsError] = useState(false);
  
  const [errors, setErrors] = useState<{username?: string; email?: string; bio?: string}>({});
  
  const [previewImage, setPreviewImage] = useState(
    user?.profile_image ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}${user.profile_image}` : ""
  );
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const address = user?.proxyWallet || user?.proxy_wallet;

  const validate = () => {
    const newErrors: {username?: string; email?: string; bio?: string} = {};
    if (!username || username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (bio && bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("File size must be less than 5MB.");
      setIsError(true);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!validate()) return;
    
    setIsSaving(true);
    setSaveMessage("");
    setIsError(false);
    
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';
      const { data } = await axios.put(`${API_URL}/api/auth/update-profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (data.success) {
        dispatch(updateUser({ 
          username: data.result.username, 
          email: data.result.email, 
          bio: data.result.bio,
          profile_image: data.result.profile_image || user?.profile_image
        }));
        setSaveMessage("Profile updated successfully!");
        setErrors({});
      } else {
        setSaveMessage(data.message || "Error updating profile.");
        setIsError(true);
      }
    } catch (err: any) {
      console.error("Error saving profile:", err);
      const message = err.response?.data?.message || err.message || "Error saving profile.";
      setSaveMessage(message);
      setIsError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Profile Settings</h2>

      {/* Avatar Upload */}
      <div className="flex items-center gap-6 mb-8 mt-4">
        <div 
           className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-500 flex-shrink-0 shadow-lg relative group cursor-pointer overflow-hidden border-4 border-white dark:border-zinc-900"
           onClick={() => fileInputRef.current?.click()}
        >
          {previewImage && (
             <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-white font-medium uppercase tracking-wider">Change</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Profile Picture</h3>
          <p className="text-xs text-zinc-500">Must be JPEG, PNG, or WEBP and cannot exceed 5MB.</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full bg-transparent border ${errors.username ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-800'} focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors`}
          />
          {errors.username && <p className="text-xs text-rose-500 font-medium">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full bg-transparent border ${errors.email ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-800'} focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors`}
          />
          {errors.email && <p className="text-xs text-rose-500 font-medium">{errors.email}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Address</label>
          <div className="flex items-center gap-2">
            <div className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-500 font-mono text-sm">
              {address}
            </div>
            <button 
              onClick={() => address && copyToClipboard(address)}
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className={`w-full h-24 bg-transparent border ${errors.bio ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-800'} focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-4 py-2.5 outline-none text-zinc-900 dark:text-zinc-100 transition-colors resize-none`}
          />
          {errors.bio && <p className="text-xs text-rose-500 font-medium">{errors.bio}</p>}
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button 
             onClick={handleSaveProfile}
             disabled={isSaving}
             className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-70 text-white rounded-xl transition-colors font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center gap-2"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : null}
            {isSaving ? "Saving..." : "Save changes"}
          </button>
          
          {saveMessage && (
            <p className={`text-sm font-semibold ${isError ? 'text-rose-500' : 'text-emerald-500'} animate-in fade-in duration-300`}>
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
